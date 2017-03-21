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

        private City _ItemSelected;
        public City objItemSelected
        {
            get
            {
                return _ItemSelected;
            }
            set
            {
                if (_ItemSelected != value)
                {
                    _ItemSelected = value;
                    OnPropertyChanged("ItemSelected");

                    City c = new City();
                    c.Name = _ItemSelected.Name;
                    c.Location = _ItemSelected.Location;
                    c.Details = _ItemSelected.Details;
                    c.Image = _ItemSelected.Image;
                    Cities = new ObservableCollection<City> { c };
                    Application.Current.MainPage.Navigation.PushAsync(new CityDetailsView3(Cities));
                }
            }
        }
    }
}