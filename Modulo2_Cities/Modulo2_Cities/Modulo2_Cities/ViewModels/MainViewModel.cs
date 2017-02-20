using Modulo2_Cities.Models;
using Modulo2_Cities.Services;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels
***REMOVED***
    public class MainViewModel : BindableObject
    ***REMOVED***
        public ObservableCollection<City> Cities ***REMOVED*** get; set; ***REMOVED***

        public MainViewModel()
        ***REMOVED***            
            Cities = CitiesService.GetCities();
    ***REMOVED***        
***REMOVED***
***REMOVED***