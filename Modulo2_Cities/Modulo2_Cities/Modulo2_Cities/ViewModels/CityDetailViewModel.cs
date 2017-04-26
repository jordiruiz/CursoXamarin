using CursoXamarin.Models;
using CursoXamarin.ViewModels.Base;

namespace CursoXamarin.ViewModels
{
    public class CityDetailViewModel : ViewModelBase
    {
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
    }
}
