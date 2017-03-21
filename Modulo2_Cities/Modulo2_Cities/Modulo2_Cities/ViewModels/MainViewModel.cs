using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
***REMOVED***
    public class MainViewModel : BindableObject
    ***REMOVED***
        public ObservableCollection<City> Cities ***REMOVED*** get; set; ***REMOVED***

        public MainViewModel()
        ***REMOVED***            
            Cities = CitiesService.GetCities();
    ***REMOVED***

        private City _ItemSelected;
        public City objItemSelected
        ***REMOVED***
            get
            ***REMOVED***
                return _ItemSelected;
        ***REMOVED***
            set
            ***REMOVED***
                if (_ItemSelected != value)
                ***REMOVED***
                    _ItemSelected = value;
                    OnPropertyChanged("ItemSelected");

                    City c = new City();
                    c.Name = _ItemSelected.Name;
                    c.Location = _ItemSelected.Location;
                    c.Details = _ItemSelected.Details;
                    c.Image = _ItemSelected.Image;
                    Cities = new ObservableCollection<City> ***REMOVED*** c ***REMOVED***;
                    Application.Current.MainPage.Navigation.PushAsync(new CityDetailsView3(Cities));
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***