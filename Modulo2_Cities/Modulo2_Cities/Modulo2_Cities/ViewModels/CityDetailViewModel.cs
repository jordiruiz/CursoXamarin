using CursoXamarin.Models;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
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
