using Modulo2_Cities.Models;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
{
    public class CityDetailViewModel : BindableObject
    {
        public City City { get; set; }

        public CityDetailViewModel(City city)
        {
            City = city;
        }
    }
}
