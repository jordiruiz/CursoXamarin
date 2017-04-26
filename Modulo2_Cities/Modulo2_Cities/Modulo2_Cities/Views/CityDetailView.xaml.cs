using CursoXamarin.Models;
using CursoXamarin.ViewModels;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace CursoXamarin.Views
{
    public partial class CityDetailView : ContentPage
    {
        public CityDetailView(City city)
        {
            InitializeComponent();
            BindingContext = new CityDetailViewModel(city);
        }
    }
}
