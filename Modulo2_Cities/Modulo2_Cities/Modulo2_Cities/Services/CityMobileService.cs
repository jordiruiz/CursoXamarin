using Microsoft.WindowsAzure.MobileServices;
using CursoXamarin.Infrastructure;
using CursoXamarin.Models;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CursoXamarin.Services
{
    public class CityMobileService : IRepoService<City>
    {
        private IMobileServiceTable<City> _cityTable;
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

        public CityMobileService()
        {
            if (mobileService != null)
                return;

            mobileService = new MobileServiceClient(GlobalSettings.CityMobileServiceEndpoint);
            _cityTable = mobileService.GetTable<City>();
        }

        public Task<IEnumerable<City>> GetAll()
        {
            return _cityTable.ReadAsync();            
        }

        public async Task AddOrUpdateCityAsync(City Item)
        {
            if (string.IsNullOrEmpty(Item.Id))
            {
                await _cityTable.InsertAsync(Item);
            }
            else
            {
                await _cityTable.UpdateAsync(Item);
            }
        }

        public async Task DeleteCityItemAsync(City Item)
        {
            await _cityTable.DeleteAsync(Item);
        }
    }
}
