using CursoXamarin.ViewModels;
using Xamarin.Forms;

namespace CursoXamarin.Views
{
    public partial class MainView : ContentPage
    {
        public MainView(object parameter)
        {
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new MainViewModel();
        }

        public object Parameter { get; set; }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            var viewModel = BindingContext as MainViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
        }
    }
}
