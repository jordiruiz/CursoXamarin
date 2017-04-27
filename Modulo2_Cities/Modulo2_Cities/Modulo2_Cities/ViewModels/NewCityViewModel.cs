using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using Plugin.Media.Abstractions;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class NewCityViewModel : ViewModelBase
    ***REMOVED***
        private string _name;
        private string _detail;
        private MediaFile _image;

        public MediaFile Image
        ***REMOVED***
            get ***REMOVED*** return _image; ***REMOVED***
            set
            ***REMOVED***
                _image = value;
                OnPropertyChanged("ImageUrl");
        ***REMOVED***
    ***REMOVED***

        public string Name
        ***REMOVED***
            get ***REMOVED*** return _name; ***REMOVED***
            set
            ***REMOVED***
                _name = value;
                OnPropertyChanged("Name");
        ***REMOVED***
    ***REMOVED***

        public string Detail
        ***REMOVED***
            get ***REMOVED*** return _detail; ***REMOVED***
            set
            ***REMOVED***
                _detail = value;
                OnPropertyChanged("Detail");
        ***REMOVED***
    ***REMOVED***

        public ICommand CameraCommand => new Command(CameraAsync);

        public ICommand SaveCommand => new Command(SaveAsync);

        public ICommand CancelCommand => new Command(Cancel);

        private async void CameraAsync()
        ***REMOVED***
            var result = await PhotoService.GetInstance().PickPhotoAsync();

            if (result != null)
            ***REMOVED***
                _image = result;                
        ***REMOVED***
    ***REMOVED***

        private async void SaveAsync()
        ***REMOVED***
            var ImageUrl = await BlobService.GetInstance().UploadPhotoAsync(Image);

            var city = new City
            ***REMOVED***
                Name = Name,
                Image = ImageUrl,
                Detail = Detail
        ***REMOVED***;

            var _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

            await _cityService.AddOrUpdateCityAsync(city);

            NavigationService.Instance.NavigateBack();
    ***REMOVED***

        private void Cancel()
        ***REMOVED***
            NavigationService.Instance.NavigateBack();
    ***REMOVED***
***REMOVED***
***REMOVED***
