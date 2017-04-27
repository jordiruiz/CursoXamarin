using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
{
    public class CityDetailViewModel : ViewModelBase
    {
        public ICommand EditCommand => new Command(Edit);
        public ICommand DeleteCommand => new Command(async () => await DeleteAsync());

        private City _city;

        public City City
        {
            get { return _city; }
            set
            {
                _city = value;
                OnPropertyChanged("City");
            }
        }

        public override void OnAppearing(object navigationContext)
        {
            base.OnAppearing(navigationContext);

            if (navigationContext is City)
            {
                City = (City)navigationContext;
            }
        }

        private void Edit()
        {
            NavigationService.Instance.NavigateTo<NewCityViewModel>(City);
        }

        private async Task DeleteAsync()
        {
            if (City.Id != null)
            {
                var _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

                await _cityService.DeleteCityAsync(City);

                NavigationService.Instance.NavigateBack();
            }
        }
    }
}
