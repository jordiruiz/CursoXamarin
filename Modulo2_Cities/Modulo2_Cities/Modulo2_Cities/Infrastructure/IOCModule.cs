using Ninject.Modules;
using Modulo2_Cities.Services;
using Modulo2_Cities.Models;

namespace Modulo2_Cities.Infrastructure
{
    public class IOCModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IRepoService<City>>().ToMethod(c => CityService.GetInstance(c.Kernel));
        }
    }
}