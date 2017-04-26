using Ninject.Modules;
using CursoXamarin.Services;
using CursoXamarin.Models;

namespace CursoXamarin.Infrastructure
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