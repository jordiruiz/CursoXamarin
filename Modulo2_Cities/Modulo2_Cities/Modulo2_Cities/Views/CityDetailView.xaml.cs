using CursoXamarin.ViewModels;
using Xamarin.Forms;

namespace CursoXamarin.Views
***REMOVED***
    public partial class CityDetailView : ContentPage
    ***REMOVED***
        public CityDetailView(object parameter)
        ***REMOVED***
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new CityDetailViewModel();
    ***REMOVED***

        public object Parameter ***REMOVED*** get; set; ***REMOVED***

        protected override void OnAppearing()
        ***REMOVED***
            base.OnAppearing();

            var viewModel = BindingContext as CityDetailViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
    ***REMOVED***
***REMOVED***
***REMOVED***
