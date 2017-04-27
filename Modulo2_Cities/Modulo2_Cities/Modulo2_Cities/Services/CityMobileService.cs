using Microsoft.WindowsAzure.MobileServices;
using CursoXamarin.Infrastructure;
using CursoXamarin.Models;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.WindowsAzure.MobileServices.SQLiteStore;
using Microsoft.WindowsAzure.MobileServices.Sync;
using System.Diagnostics;
using Plugin.Connectivity;
using Newtonsoft.Json.Linq;
using System.Linq;
using Xamarin.Forms;
using System.IO;

namespace CursoXamarin.Services
{
    public class CityMobileService : IRepoService<City>
    {
        private IMobileServiceSyncTable<City> _cityTable;
        MobileServiceClient mobileService;

        private static CityMobileService _instance;

        public static CityMobileService GetInstance(IKernel kernelForInjection)
        {
            if (_instance == null)
            {
                _instance = new CityMobileService();

                kernelForInjection.Inject(_instance);
            }

            return _instance;
        }

        public async Task InitializeAsync()
        {
            if (mobileService != null)
                return;

            // Inicialización de SQLite local (cache offline)
            var store = new MobileServiceSQLiteStore("cursoxamarin.db");
            store.DefineTable<City>();

            mobileService = new MobileServiceClient(GlobalSettings.CityMobileServiceEndpoint);
            _cityTable = mobileService.GetSyncTable<City>();

            await mobileService.SyncContext.InitializeAsync(store,
                new MobileServiceSyncHandler());

            if (CrossConnectivity.Current.IsConnected)
            {
                try
                {
                    var cities = await _cityTable.ReadAsync();

                    var citiesList = new List<City>(cities);

                    //subimos las imagenes offline al blob
                    foreach (var city in citiesList.Where(city => city.OfflineImage != null))
                    {
                        city.Image = await BlobService.GetInstance().UploadPhotoAsync(city.OfflineImage);
                        city.OfflineImage = null;

                        await _cityTable.UpdateAsync(city);
                    }                    

                    // Subir cambios a la base de datos remota
                    await mobileService.SyncContext.PushAsync();

                    await _cityTable.PullAsync(
                        "allCities", _cityTable.CreateQuery());
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Exception: {0}", ex.Message);
                }
            }
        }

        public async Task<IEnumerable<City>> GetAll()
        {
            await InitializeAsync();

            var cities = await _cityTable.ReadAsync();

            return cities;
        }

        public async Task AddOrUpdateCityAsync(City Item)
        {
            await InitializeAsync();

            if (string.IsNullOrEmpty(Item.Id))
            {
                try
                {
                    await _cityTable.InsertAsync(Item);
                }
                catch (Exception ex)
                {

                    throw;
                }                
            }
            else
            {
                await _cityTable.UpdateAsync(Item);
            }

            await SynchronizeCityAsync(Item.Id);
        }

        public async Task DeleteCityAsync(City Item)
        {
            await InitializeAsync();

            try
            {
                await _cityTable.DeleteAsync(Item);                
            }
            catch (InvalidOperationException ex)
            {
                if (!CrossConnectivity.Current.IsConnected)
                    return;

                await SynchronizeCityAsync(Item.Id);
                await _cityTable.DeleteAsync(Item);
            }

            await SynchronizeCityAsync(Item.Id);
        }

        private async Task SynchronizeCityAsync(string CityId)
        {
            if (!CrossConnectivity.Current.IsConnected)
                return;

            try
            {
                // Subir cambios a la base de datos remota
                await mobileService.SyncContext.PushAsync();

                // El primer parámetro es el nombre de la query utilizada intermanente por el client SDK para implementar sync.
                // Utiliza uno diferente por cada query en la App
                await _cityTable.PullAsync("syncCity" + CityId,
                    _cityTable.Where(r => r.Id == CityId));
            }
            catch (MobileServicePushFailedException ex)
            {
                if (ex.PushResult != null)
                {
                    foreach (var result in ex.PushResult.Errors)
                    {
                        await ResolveErrorAsync(result);
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Excepción: {0}", ex.Message);
            }
        }

        private async Task ResolveErrorAsync(MobileServiceTableOperationError result)
        {
            // Ignoramos si no podemos validar ambas partes.
            if (result.Result == null || result.Item == null)
                return;

            var serverItem = result.Result.ToObject<City>();
            var localItem = result.Item.ToObject<City>();

            if (serverItem.Name == localItem.Name
                && serverItem.Id == localItem.Id)
            {
                // Los elementos sin iguales, ignoramos el conflicto
                await result.CancelAndDiscardItemAsync();
            }
            else
            {
                // Para nosotros, gana el cliente
                localItem.AzureVersion = serverItem.AzureVersion;
                await result.UpdateOperationAsync(JObject.FromObject(localItem));
            }
        }
    }
}
