using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
{
    public class MainViewModel : ViewModelBase
    {
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;
        private bool _isBusy;

        public ICommand NewCommand => new Command(New);
        public ICommand RefreshCommand => new Command(async () => await RefreshAsync());

        public MainViewModel()
        {
            _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;            
        }
        
        public ObservableCollection<City> Cities
        {
            get { return _cities;}
            set
            {
                _cities = value;
                OnPropertyChanged("Cities");
            }
        }

        public City SelectedItem
        {
            get { return _selectedItem; }
            set
            {
                _selectedItem = value;

                NavigationService.Instance.NavigateTo<CityDetailViewModel>(_selectedItem);
            }
        }

        public bool IsBusy
        {
            get { return _isBusy; }
            set
            {
                if (_isBusy == value)
                    return;

                _isBusy = value;
                OnPropertyChanged("IsBusy");
            }
        }        

        public override async void OnAppearing(object navigationContext)
        {
            base.OnAppearing(navigationContext);

            await LoadCitiesAsync();
        }

        private async Task LoadCitiesAsync()
        {
            IsBusy = true;

            var result = await _cityService.GetAll();

            if (result != null)
            {
                Cities = new ObservableCollection<City>(result);
            }

            IsBusy = false;
        }

        private void New()
        {
            NavigationService.Instance.NavigateTo<NewCityViewModel>();
        }

        private async Task RefreshAsync()
        {
            await LoadCitiesAsync();
        }
    }
}