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
***REMOVED***
    public class CityMobileService : IRepoService<City>
    ***REMOVED***
        private IMobileServiceSyncTable<City> _cityTable;
        MobileServiceClient mobileService;

        private static CityMobileService _instance;

        public static CityMobileService GetInstance(IKernel kernelForInjection)
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new CityMobileService();

                kernelForInjection.Inject(_instance);
        ***REMOVED***

            return _instance;
    ***REMOVED***

        public async Task InitializeAsync()
        ***REMOVED***
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
            ***REMOVED***
                try
                ***REMOVED***
                    var cities = await _cityTable.ReadAsync();

                    var citiesList = new List<City>(cities);

                    //subimos las imagenes offline al blob
                    foreach (var city in citiesList.Where(city => city.OfflineImage != null))
                    ***REMOVED***
                        city.Image = await BlobService.GetInstance().UploadPhotoAsync(city.OfflineImage);
                        city.OfflineImage = null;

                        await _cityTable.UpdateAsync(city);
                ***REMOVED***                    

                    // Subir cambios a la base de datos remota
                    await mobileService.SyncContext.PushAsync();

                    await _cityTable.PullAsync(
                        "allCities", _cityTable.CreateQuery());
            ***REMOVED***
                catch (Exception ex)
                ***REMOVED***
                    Debug.WriteLine("Exception: ***REMOVED***0***REMOVED***", ex.Message);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        public async Task<IEnumerable<City>> GetAll()
        ***REMOVED***
            await InitializeAsync();

            var cities = await _cityTable.ReadAsync();

            return cities;
    ***REMOVED***

        public async Task AddOrUpdateCityAsync(City Item)
        ***REMOVED***
            await InitializeAsync();

            if (string.IsNullOrEmpty(Item.Id))
            ***REMOVED***
                try
                ***REMOVED***
                    await _cityTable.InsertAsync(Item);
            ***REMOVED***
                catch (Exception ex)
                ***REMOVED***

                    throw;
            ***REMOVED***                
        ***REMOVED***
            else
            ***REMOVED***
                await _cityTable.UpdateAsync(Item);
        ***REMOVED***

            await SynchronizeCityAsync(Item.Id);
    ***REMOVED***

        public async Task DeleteCityAsync(City Item)
        ***REMOVED***
            await InitializeAsync();

            try
            ***REMOVED***
                await _cityTable.DeleteAsync(Item);                
        ***REMOVED***
            catch (InvalidOperationException ex)
            ***REMOVED***
                if (!CrossConnectivity.Current.IsConnected)
                    return;

                await SynchronizeCityAsync(Item.Id);
                await _cityTable.DeleteAsync(Item);
        ***REMOVED***

            await SynchronizeCityAsync(Item.Id);
    ***REMOVED***

        private async Task SynchronizeCityAsync(string CityId)
        ***REMOVED***
            if (!CrossConnectivity.Current.IsConnected)
                return;

            try
            ***REMOVED***
                // Subir cambios a la base de datos remota
                await mobileService.SyncContext.PushAsync();

                // El primer parámetro es el nombre de la query utilizada intermanente por el client SDK para implementar sync.
                // Utiliza uno diferente por cada query en la App
                await _cityTable.PullAsync("syncCity" + CityId,
                    _cityTable.Where(r => r.Id == CityId));
        ***REMOVED***
            catch (MobileServicePushFailedException ex)
            ***REMOVED***
                if (ex.PushResult != null)
                ***REMOVED***
                    foreach (var result in ex.PushResult.Errors)
                    ***REMOVED***
                        await ResolveErrorAsync(result);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            catch (Exception ex)
            ***REMOVED***
                Debug.WriteLine("Excepción: ***REMOVED***0***REMOVED***", ex.Message);
        ***REMOVED***
    ***REMOVED***

        private async Task ResolveErrorAsync(MobileServiceTableOperationError result)
        ***REMOVED***
            // Ignoramos si no podemos validar ambas partes.
            if (result.Result == null || result.Item == null)
                return;

            var serverItem = result.Result.ToObject<City>();
            var localItem = result.Item.ToObject<City>();

            if (serverItem.Name == localItem.Name
                && serverItem.Id == localItem.Id)
            ***REMOVED***
                // Los elementos sin iguales, ignoramos el conflicto
                await result.CancelAndDiscardItemAsync();
        ***REMOVED***
            else
            ***REMOVED***
                // Para nosotros, gana el cliente
                localItem.AzureVersion = serverItem.AzureVersion;
                await result.UpdateOperationAsync(JObject.FromObject(localItem));
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
