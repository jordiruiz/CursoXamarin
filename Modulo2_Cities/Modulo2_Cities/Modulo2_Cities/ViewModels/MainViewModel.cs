using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class MainViewModel : ViewModelBase
    ***REMOVED***
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;
        public ICommand NewCommand => new Command(New);

        public MainViewModel()
        ***REMOVED***
            _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;            
    ***REMOVED***
        
        public ObservableCollection<City> Cities
        ***REMOVED***
            get ***REMOVED*** return _cities;***REMOVED***
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

        public override async void OnAppearing(object navigationContext)
        ***REMOVED***
            base.OnAppearing(navigationContext);

            var result = await _cityService.GetAll();

            if (result != null)
            ***REMOVED***
                Cities = new ObservableCollection<City>(result);
        ***REMOVED***
    ***REMOVED***

        private void New()
        ***REMOVED***
            NavigationService.Instance.NavigateTo<NewCityViewModel>();
    ***REMOVED***
***REMOVED***
***REMOVED***