using CursoXamarin.ViewModels;
using Xamarin.Forms;

namespace CursoXamarin.Views
{
    public partial class CityDetailView : ContentPage
    {
        public CityDetailView(object parameter)
        {
            InitializeComponent();

            Parameter = parameter;

            BindingContext = new CityDetailViewModel();
        }

        public object Parameter { get; set; }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            var viewModel = BindingContext as CityDetailViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
        }
    }
}
