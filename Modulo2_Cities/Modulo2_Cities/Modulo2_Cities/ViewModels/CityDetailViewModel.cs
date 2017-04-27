using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class CityDetailViewModel : ViewModelBase
    ***REMOVED***
        public ICommand EditCommand => new Command(Edit);
        public ICommand DeleteCommand => new Command(async () => await DeleteAsync());

        private City _city;

        public City City
        ***REMOVED***
            get ***REMOVED*** return _city; ***REMOVED***
            set
            ***REMOVED***
                _city = value;
                OnPropertyChanged("City");
        ***REMOVED***
    ***REMOVED***

        public override void OnAppearing(object navigationContext)
        ***REMOVED***
            base.OnAppearing(navigationContext);

            if (navigationContext is City)
            ***REMOVED***
                City = (City)navigationContext;
        ***REMOVED***
    ***REMOVED***

        private void Edit()
        ***REMOVED***
            NavigationService.Instance.NavigateTo<NewCityViewModel>(City);
    ***REMOVED***

        private async Task DeleteAsync()
        ***REMOVED***
            if (City.Id != null)
            ***REMOVED***
                var _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

                await _cityService.DeleteCityAsync(City);

                NavigationService.Instance.NavigateBack();
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
