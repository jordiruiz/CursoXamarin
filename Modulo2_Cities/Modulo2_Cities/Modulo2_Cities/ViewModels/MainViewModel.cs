using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class MainViewModel : ViewModelBase
    ***REMOVED***
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;
        private bool _isBusy;

        public ICommand NewCommand => new Command(New);
        public ICommand RefreshCommand => new Command(async () => await RefreshAsync());

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

        public bool IsBusy
        ***REMOVED***
            get ***REMOVED*** return _isBusy; ***REMOVED***
            set
            ***REMOVED***
                if (_isBusy == value)
                    return;

                _isBusy = value;
                OnPropertyChanged("IsBusy");
        ***REMOVED***
    ***REMOVED***        

        public override async void OnAppearing(object navigationContext)
        ***REMOVED***
            base.OnAppearing(navigationContext);

            await LoadCitiesAsync();
    ***REMOVED***

        private async Task LoadCitiesAsync()
        ***REMOVED***
            IsBusy = true;

            var result = await _cityService.GetAll();

            if (result != null)
            ***REMOVED***
                Cities = new ObservableCollection<City>(result);
        ***REMOVED***

            IsBusy = false;
    ***REMOVED***

        private void New()
        ***REMOVED***
            NavigationService.Instance.NavigateTo<NewCityViewModel>();
    ***REMOVED***

        private async Task RefreshAsync()
        ***REMOVED***
            await LoadCitiesAsync();
    ***REMOVED***
***REMOVED***
***REMOVED***