using Modulo2_Cities.Models;
using Modulo2_Cities.ViewModels;
using Xamarin.Forms;

namespace Modulo2_Cities.Views
***REMOVED***
    public partial class MainView : ContentPage
    ***REMOVED***
        public MainView()
        ***REMOVED***
            InitializeComponent();

            BindingContext = new MainViewModel();
    ***REMOVED***

        public async void Handle_ItemTapped(object sender, ItemTappedEventArgs e)
        ***REMOVED***
            await Application.Current.MainPage.Navigation.PushAsync(new CityDetailView((City)e.Item));
    ***REMOVED***
***REMOVED***
***REMOVED***
