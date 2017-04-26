using Microsoft.WindowsAzure.MobileServices;
using Modulo2_Cities.Infrastructure;
using Modulo2_Cities.Models;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Modulo2_Cities.Services
***REMOVED***
    public class CityMobileService : IRepoService<City>
    ***REMOVED***
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

        public Task<IEnumerable<City>> GetAll()
        ***REMOVED***
            try
            ***REMOVED***
                mobileService = new MobileServiceClient(GlobalSettings.CityMobileServiceEndpoint);

                var table = mobileService.GetTable<City>();

                var items = table.ReadAsync();

                return items;
        ***REMOVED***
            catch (System.Exception ex)
            ***REMOVED***
                throw;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
