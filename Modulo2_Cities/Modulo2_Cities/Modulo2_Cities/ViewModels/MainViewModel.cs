using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
{
    public class MainViewModel : BindableObject
    {
        public ObservableCollection<City> Cities { get; set; }

        public MainViewModel()
        {            
            Cities = CitiesService.GetCities();
        }        
    }
}