using CursoXamarin.Models;
using CursoXamarin.ViewModels;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace CursoXamarin.Views
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
