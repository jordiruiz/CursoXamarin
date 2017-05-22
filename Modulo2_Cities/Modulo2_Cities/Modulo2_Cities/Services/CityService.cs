using CursoXamarin.Models;
using CursoXamarin.Resources.Texts;
using Ninject;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.WindowsAzure.MobileServices;

namespace CursoXamarin.Services
{
    public class CityService : IRepoService<City>
    {
        private static IEnumerable<City> _cities;
        private static CityService _instance;

        public IMobileServiceClient Client => throw new NotImplementedException();

        public static CityService GetInstance(IKernel kernelForInjection)
        {
            if (_instance == null)
            {
                _instance = new CityService();

                seed();

                kernelForInjection.Inject(_instance);
            }

            return _instance;
        }

        private static void seed()
        {
            _cities = new City[]
                {
                    new City
                    {
                        Name = "New York",
                        Detail = CitiesDetail.NewYok,
                        Image = "CursoXamarin.Resources.Images.NewYork.png",
                    },
                    new City
                    {
                        Name = "Paris",
                        Detail = CitiesDetail.Paris,
                        Image = "CursoXamarin.Resources.Images.Paris.png",
                    },
                    new City
                    {
                        Name = "Roma",
                        Detail = CitiesDetail.Roma,
                        Image = "CursoXamarin.Resources.Images.Roma.png",
                    },
                    new City
                    {
                        Name = "San Francisco",
                        Detail = CitiesDetail.SanFrancisco,
                        Image = "CursoXamarin.Resources.Images.SanFrancisco.png",
                    },
                    new City
                    {
                        Name = "Seattle",
                        Detail = CitiesDetail.Seattle,
                        Image = "CursoXamarin.Resources.Images.Seattle.png",
                    },
                    new City
                    {
                        Name = "Sevilla",
                        Detail = CitiesDetail.Sevilla,
                        Image = "CursoXamarin.Resources.Images.Sevilla.png",
                    }
                };
        }

        public Task AddOrUpdateCityAsync(City Item)
        {
            var tarea = new Task(() =>
            {
                var cities = new List<City>(_cities);

                cities.Add(Item);

                _cities = cities.ToArray();
            });

            tarea.Start();

            return tarea;
        }

        public Task<IEnumerable<City>> GetAll()
        {
            var tarea = new Task<IEnumerable<City>>(() =>
            {
                return _cities;
            });

            tarea.Start();

            return tarea;
        }

        public Task DeleteCityAsync(City Item)
        {
            var tarea = new Task(() =>
            {
                var cities = new List<City>(_cities);

                cities.Remove(Item);

                _cities = cities.ToArray();
            });

            tarea.Start();

            return tarea;
        }
    }
}
