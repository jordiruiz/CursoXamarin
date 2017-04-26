using Ninject.Modules;
using Modulo2_Cities.Services;
using Modulo2_Cities.Models;

namespace Modulo2_Cities.Infrastructure
{
    public class IOCModule : NinjectModule
    {
        public override void Load()
        {
            //repo local
            //Bind<IRepoService<City>>().ToMethod(c => CityService.GetInstance(c.Kernel));
            //repo azure
            Bind<IRepoService<City>>().ToMethod(c => CityMobileService.GetInstance(c.Kernel));
        }
    }
}