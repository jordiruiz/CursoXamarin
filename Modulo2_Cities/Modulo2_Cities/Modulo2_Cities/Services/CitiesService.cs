using Modulo2_Cities.Models;
using Modulo2_Cities.Resources.Texts;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.Services
{
    public class CitiesService
    {
        private static CitiesService _instance;

        public static CitiesService Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new CitiesService();
                }

                return _instance;
            }
        }

        public ObservableCollection<City> GetCities()
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
