using Modulo2_Cities.Models;
using Modulo2_Cities.Resources.Texts;
using Ninject;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Modulo2_Cities.Services
***REMOVED***
    public class CityService : IRepoService<City>
    ***REMOVED***
        private static CityService _instance;

        public static CityService GetInstance(IKernel kernelForInjection)
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new CityService();

                kernelForInjection.Inject(_instance);
        ***REMOVED***

            return _instance;
    ***REMOVED***

        public Task<IEnumerable<City>> GetAll()
        ***REMOVED***
            var tarea = new Task<IEnumerable<City>>(() =>
            ***REMOVED***
                return new City[]
                ***REMOVED***
                    new City
                    ***REMOVED***
                        Name = "New York",
                        Detail = CitiesDetail.NewYok,
                        Image = "Modulo2_Cities.Resources.Images.NewYork.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Paris",
                        Detail = CitiesDetail.Paris,
                        Image = "Modulo2_Cities.Resources.Images.Paris.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Roma",
                        Detail = CitiesDetail.Roma,
                        Image = "Modulo2_Cities.Resources.Images.Roma.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "San Francisco",
                        Detail = CitiesDetail.SanFrancisco,
                        Image = "Modulo2_Cities.Resources.Images.SanFrancisco.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Seattle",
                        Detail = CitiesDetail.Seattle,
                        Image = "Modulo2_Cities.Resources.Images.Seattle.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Sevilla",
                        Detail = CitiesDetail.Sevilla,
                        Image = "Modulo2_Cities.Resources.Images.Sevilla.png",
                ***REMOVED***
            ***REMOVED***;
        ***REMOVED***);

            tarea.Start();

            return tarea;
    ***REMOVED***
***REMOVED***
***REMOVED***
