using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using Modulo2_Cities.Views;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
***REMOVED***
    public class MainViewModel : BindableObject
    ***REMOVED***
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;

        public MainViewModel()
        ***REMOVED***
            _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

            Cities = _cityService.GetAll();
    ***REMOVED***
        
        public ObservableCollection<City> Cities
        ***REMOVED***
            get ***REMOVED*** return _cities; ***REMOVED***
            set
            ***REMOVED***
                _cities = value;
                OnPropertyChanged("Cities");
        ***REMOVED***
    ***REMOVED***

        public City SelectedItem
        ***REMOVED***
            get ***REMOVED*** return _selectedItem; ***REMOVED***
            set
            ***REMOVED***
                _selectedItem = value;

                NavigationService.Instance.NavigateTo<CityDetailViewModel>(_selectedItem);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***