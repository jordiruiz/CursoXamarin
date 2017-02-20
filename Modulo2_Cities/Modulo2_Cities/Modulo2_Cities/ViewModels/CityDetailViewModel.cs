using Modulo2_Cities.Models;

namespace Modulo2_Cities.ViewModels
{
    public class CityDetailViewModel
    {
        public City City { get; set; }

        public CityDetailViewModel(City city)
        {
            City = city;
        }
    }
}
