using Modulo2_Cities.Models;
using Modulo2_Cities.Resources.Texts;
using Ninject;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Modulo2_Cities.Services
{
    public class CityService : IRepoService<City>
    {
        private static CityService _instance;

        public static CityService GetInstance(IKernel kernelForInjection)
        {
            if (_instance == null)
            {
                _instance = new CityService();

                kernelForInjection.Inject(_instance);
            }

            return _instance;
        }

        public Task<IEnumerable<City>> GetAll()
        {
            var tarea = new Task<IEnumerable<City>>(() =>
            {
                return new City[]
                {
                    new City
                    {
                        Name = "New York",
                        Detail = CitiesDetail.NewYok,
                        Image = "Modulo2_Cities.Resources.Images.NewYork.png",
                    },
                    new City
                    {
                        Name = "Paris",
                        Detail = CitiesDetail.Paris,
                        Image = "Modulo2_Cities.Resources.Images.Paris.png",
                    },
                    new City
                    {
                        Name = "Roma",
                        Detail = CitiesDetail.Roma,
                        Image = "Modulo2_Cities.Resources.Images.Roma.png",
                    },
                    new City
                    {
                        Name = "San Francisco",
                        Detail = CitiesDetail.SanFrancisco,
                        Image = "Modulo2_Cities.Resources.Images.SanFrancisco.png",
                    },
                    new City
                    {
                        Name = "Seattle",
                        Detail = CitiesDetail.Seattle,
                        Image = "Modulo2_Cities.Resources.Images.Seattle.png",
                    },
                    new City
                    {
                        Name = "Sevilla",
                        Detail = CitiesDetail.Sevilla,
                        Image = "Modulo2_Cities.Resources.Images.Sevilla.png",
                    }
                };
            });

            tarea.Start();

            return tarea;
        }
    }
}
