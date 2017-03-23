using Modulo2_Cities.Models;
using Modulo2_Cities.ViewModels;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.Views
***REMOVED***
    public partial class CityDetailView : ContentPage
    ***REMOVED***
        public CityDetailView(City city)
        ***REMOVED***
            InitializeComponent();
            BindingContext = new CityDetailViewModel(city);
    ***REMOVED***
***REMOVED***
***REMOVED***
