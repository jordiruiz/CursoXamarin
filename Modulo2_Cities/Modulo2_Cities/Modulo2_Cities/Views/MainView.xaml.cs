using Modulo2_Cities.ViewModels;
using Xamarin.Forms;

namespace Modulo2_Cities.Views
***REMOVED***
    public partial class MainView : ContentPage
    ***REMOVED***
        public MainView(object parameter)
        ***REMOVED***
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new MainViewModel();
    ***REMOVED***

        public object Parameter ***REMOVED*** get; set; ***REMOVED***

        protected override void OnAppearing()
        ***REMOVED***
            base.OnAppearing();

            var viewModel = BindingContext as MainViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
    ***REMOVED***
***REMOVED***
***REMOVED***
