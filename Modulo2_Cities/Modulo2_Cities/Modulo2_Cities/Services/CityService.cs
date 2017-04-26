using CursoXamarin.Models;
using CursoXamarin.Resources.Texts;
using Ninject;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace CursoXamarin.Services
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
                        Image = "CursoXamarin.Resources.Images.NewYork.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Paris",
                        Detail = CitiesDetail.Paris,
                        Image = "CursoXamarin.Resources.Images.Paris.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Roma",
                        Detail = CitiesDetail.Roma,
                        Image = "CursoXamarin.Resources.Images.Roma.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "San Francisco",
                        Detail = CitiesDetail.SanFrancisco,
                        Image = "CursoXamarin.Resources.Images.SanFrancisco.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Seattle",
                        Detail = CitiesDetail.Seattle,
                        Image = "CursoXamarin.Resources.Images.Seattle.png",
                ***REMOVED***,
                    new City
                    ***REMOVED***
                        Name = "Sevilla",
                        Detail = CitiesDetail.Sevilla,
                        Image = "CursoXamarin.Resources.Images.Sevilla.png",
                ***REMOVED***
            ***REMOVED***;
        ***REMOVED***);

            tarea.Start();

            return tarea;
    ***REMOVED***
***REMOVED***
***REMOVED***
