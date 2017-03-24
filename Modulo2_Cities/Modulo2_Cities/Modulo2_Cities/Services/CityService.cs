using Modulo2_Cities.Models;
using Modulo2_Cities.Resources.Texts;
using Ninject;
using System.Collections.ObjectModel;
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

        public ObservableCollection<City> GetAll()
        {
            return new ObservableCollection<City>
            {
                new City
                {
                    Name = "New York",
                    Detail = CitiesDetail.NewYok,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.NewYork.png"),                    
                },
                new City
                {
                    Name = "Paris",
                    Detail = CitiesDetail.Paris,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Paris.png"),                    
                },
                new City
                {
                    Name = "Roma",
                    Detail = CitiesDetail.Roma,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Roma.png"),                    
                },
                new City
                {
                    Name = "San Francisco",
                    Detail = CitiesDetail.SanFrancisco,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.SanFrancisco.png"),                    
                },
                new City
                {
                    Name = "Seattle",
                    Detail = CitiesDetail.Seattle,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Seattle.png"),                    
                },
                new City
                {
                    Name = "Sevilla",
                    Detail = CitiesDetail.Sevilla,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Sevilla.png"),                    
                }
            };
        }
    }
}
