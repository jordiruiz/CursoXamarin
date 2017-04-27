using CursoXamarin.Models;
using CursoXamarin.Resources.Texts;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CursoXamarin.Services
***REMOVED***
    public class CityService : IRepoService<City>
    ***REMOVED***
        private static IEnumerable<City> _cities;
        private static CityService _instance;

        public static CityService GetInstance(IKernel kernelForInjection)
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new CityService();

                seed();

                kernelForInjection.Inject(_instance);
        ***REMOVED***

            return _instance;
    ***REMOVED***

        private static void seed()
        ***REMOVED***
            _cities = new City[]
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
    ***REMOVED***

        public Task AddOrUpdateCityAsync(City Item)
        ***REMOVED***
            var tarea = new Task(() =>
            ***REMOVED***
                var cities = new List<City>(_cities);

                cities.Add(Item);

                _cities = cities.ToArray();
        ***REMOVED***);

            tarea.Start();

            return tarea;
    ***REMOVED***

        public Task<IEnumerable<City>> GetAll()
        ***REMOVED***
            var tarea = new Task<IEnumerable<City>>(() =>
            ***REMOVED***
                return _cities;
        ***REMOVED***);

            tarea.Start();

            return tarea;
    ***REMOVED***

        public Task DeleteCityItemAsync(City Item)
        ***REMOVED***
            var tarea = new Task(() =>
            ***REMOVED***
                var cities = new List<City>(_cities);

                cities.Remove(Item);

                _cities = cities.ToArray();
        ***REMOVED***);

            tarea.Start();

            return tarea;
    ***REMOVED***
***REMOVED***
***REMOVED***
