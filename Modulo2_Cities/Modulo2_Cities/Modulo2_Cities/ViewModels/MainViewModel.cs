using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using Modulo2_Cities.Views;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
{
    public class MainViewModel : BindableObject
    {
        public ObservableCollection<City> _cities;
        private City _selectedItem;
        private IRepoService<City> _cityService;

        public MainViewModel()
        {
            _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

            Cities = _cityService.GetAll();
        }
        
        public ObservableCollection<City> Cities
        {
            get { return _cities; }
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
    }
}