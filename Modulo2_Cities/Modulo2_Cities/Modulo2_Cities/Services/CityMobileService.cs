using Microsoft.WindowsAzure.MobileServices;
using CursoXamarin.Infrastructure;
using CursoXamarin.Models;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursoXamarin.Services
{
    public class CityMobileService : IRepoService<City>
    {
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

        public Task<IEnumerable<City>> GetAll()
        {
            try
            {
                mobileService = new MobileServiceClient(GlobalSettings.CityMobileServiceEndpoint);

                var table = mobileService.GetTable<City>();

                var items = table.ReadAsync();

                return items;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
