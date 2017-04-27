using CursoXamarin.ViewModels;
using Xamarin.Forms;

namespace CursoXamarin.Views
***REMOVED***
    public partial class NewCityView : ContentPage
    ***REMOVED***
        public NewCityView(object parameter)
        ***REMOVED***
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new NewCityViewModel();
    ***REMOVED***

        public object Parameter ***REMOVED*** get; set; ***REMOVED***

        protected override void OnAppearing()
        ***REMOVED***
            base.OnAppearing();

            var viewModel = BindingContext as NewCityViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
    ***REMOVED***
***REMOVED***
***REMOVED***
