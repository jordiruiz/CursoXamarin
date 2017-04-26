using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using Modulo2_Cities.ViewModels.Base;
using Modulo2_Cities.Views;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
{
    public class MainViewModel : ViewModelBase
    {
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;

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

        public override async void OnAppearing(object navigationContext)
        {
            base.OnAppearing(navigationContext);

            var result = await _cityService.GetAll();

            if (result != null)
            {
                Cities = new ObservableCollection<City>(result);
            }
        }
    }
}