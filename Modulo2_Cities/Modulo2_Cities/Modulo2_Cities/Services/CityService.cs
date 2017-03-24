using Modulo2_Cities.Models;
using Modulo2_Cities.Resources.Texts;
using Ninject;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace Modulo2_Cities.Services
***REMOVED***
    public class CityService : IRepoService<City>
    ***REMOVED***
        private static CityService _instance;

        public static CityService GetInstance(IKernel kernelForInjection)
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new CityService();

                kernelForInjection.Inject(_instance);
        ***REMOVED***

            return _instance;
    ***REMOVED***

        public ObservableCollection<City> GetAll()
        ***REMOVED***
            return new ObservableCollection<City>
            ***REMOVED***
                new City
                ***REMOVED***
                    Name = "New York",
                    Detail = CitiesDetail.NewYok,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.NewYork.png"),                    
            ***REMOVED***,
                new City
                ***REMOVED***
                    Name = "Paris",
                    Detail = CitiesDetail.Paris,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Paris.png"),                    
            ***REMOVED***,
                new City
                ***REMOVED***
                    Name = "Roma",
                    Detail = CitiesDetail.Roma,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Roma.png"),                    
            ***REMOVED***,
                new City
                ***REMOVED***
                    Name = "San Francisco",
                    Detail = CitiesDetail.SanFrancisco,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.SanFrancisco.png"),                    
            ***REMOVED***,
                new City
                ***REMOVED***
                    Name = "Seattle",
                    Detail = CitiesDetail.Seattle,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Seattle.png"),                    
            ***REMOVED***,
                new City
                ***REMOVED***
                    Name = "Sevilla",
                    Detail = CitiesDetail.Sevilla,
                    Image = ImageSource.FromResource("Modulo2_Cities.Resources.Images.Sevilla.png"),                    
            ***REMOVED***
        ***REMOVED***;
    ***REMOVED***
***REMOVED***
***REMOVED***
