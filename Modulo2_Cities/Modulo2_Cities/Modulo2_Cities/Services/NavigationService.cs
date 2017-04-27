using CursoXamarin.ViewModels;
using CursoXamarin.Views;
using System;
using System.Collections.Generic;
using Xamarin.Forms;

namespace CursoXamarin.Services
***REMOVED***
    public class NavigationService
    ***REMOVED***
        private static NavigationService _instance;
        private IDictionary<Type, Type> viewModelRouting = new Dictionary<Type, Type>()
        ***REMOVED***
            ***REMOVED*** typeof(MainViewModel), typeof(MainView) ***REMOVED***,
            ***REMOVED*** typeof(CityDetailViewModel), typeof(CityDetailView) ***REMOVED***,
            ***REMOVED*** typeof(NewCityViewModel), typeof(NewCityView) ***REMOVED***
    ***REMOVED***;

        public static NavigationService Instance
        ***REMOVED***
            get
            ***REMOVED***
                if (_instance == null)
                ***REMOVED***
                    _instance = new NavigationService();
            ***REMOVED***

                return _instance;
        ***REMOVED***
    ***REMOVED***

        public void NavigateTo<TDestinationViewModel>(object navigationContext = null)
        ***REMOVED***
            Type pageType = viewModelRouting[typeof(TDestinationViewModel)];
            var page = Activator.CreateInstance(pageType, navigationContext) as Page;

            if (page != null)
                Application.Current.MainPage.Navigation.PushAsync(page);
    ***REMOVED***

        public void NavigateBack()
        ***REMOVED***
            Application.Current.MainPage.Navigation.PopAsync();
    ***REMOVED***
***REMOVED***
***REMOVED***
