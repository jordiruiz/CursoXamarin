using CursoXamarin.ViewModels;
using Xamarin.Forms;

namespace CursoXamarin.Views
{
    public partial class NewCityView : ContentPage
    {
        public NewCityView(object parameter)
        {
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new NewCityViewModel();
        }

        public object Parameter { get; set; }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            var viewModel = BindingContext as NewCityViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
        }
    }
}
