using Microsoft.WindowsAzure.MobileServices;
using CursoXamarin.Infrastructure;
using CursoXamarin.Models;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CursoXamarin.Services
***REMOVED***
    public class CityMobileService : IRepoService<City>
    ***REMOVED***
        private IMobileServiceTable<City> _cityTable;
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

        public CityMobileService()
        ***REMOVED***
            if (mobileService != null)
                return;

            mobileService = new MobileServiceClient(GlobalSettings.CityMobileServiceEndpoint);
            _cityTable = mobileService.GetTable<City>();
    ***REMOVED***

        public Task<IEnumerable<City>> GetAll()
        ***REMOVED***
            return _cityTable.ReadAsync();            
    ***REMOVED***

        public async Task AddOrUpdateCityAsync(City Item)
        ***REMOVED***
            if (string.IsNullOrEmpty(Item.Id))
            ***REMOVED***
                await _cityTable.InsertAsync(Item);
        ***REMOVED***
            else
            ***REMOVED***
                await _cityTable.UpdateAsync(Item);
        ***REMOVED***
    ***REMOVED***

        public async Task DeleteCityItemAsync(City Item)
        ***REMOVED***
            await _cityTable.DeleteAsync(Item);
    ***REMOVED***
***REMOVED***
***REMOVED***
