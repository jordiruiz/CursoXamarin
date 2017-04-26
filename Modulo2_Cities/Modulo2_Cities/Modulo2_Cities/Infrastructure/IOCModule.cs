using Ninject.Modules;
using Modulo2_Cities.Services;
using Modulo2_Cities.Models;

namespace Modulo2_Cities.Infrastructure
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