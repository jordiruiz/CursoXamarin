using Ninject.Modules;
using CursoXamarin.Services;
using CursoXamarin.Models;

namespace CursoXamarin.Infrastructure
***REMOVED***
    public class IOCModule : NinjectModule
    ***REMOVED***
        public override void Load()
        ***REMOVED***
            //repo local
            //Bind<IRepoService<City>>().ToMethod(c => CityService.GetInstance(c.Kernel));
            //repo azure
            Bind<IRepoService<City>>().ToMethod(c => CityMobileService.GetInstance(c.Kernel));
    ***REMOVED***
***REMOVED***
***REMOVED***