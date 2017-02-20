using Modulo2_Cities.Models;
using Modulo2_Cities.ViewModels;
using Xamarin.Forms;

namespace Modulo2_Cities.Views
{
    public partial class MainView : ContentPage
    {
        public MainView()
        {
            InitializeComponent();

            BindingContext = new MainViewModel();
        }

        public async void Handle_ItemTapped(object sender, ItemTappedEventArgs e)
        {
            await Application.Current.MainPage.Navigation.PushAsync(new CityDetailView((City)e.Item));
        }
    }
}
