using CursoXamarin.Models;
using CursoXamarin.ViewModels.Base;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class CityDetailViewModel : ViewModelBase
    ***REMOVED***
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
***REMOVED***
***REMOVED***
