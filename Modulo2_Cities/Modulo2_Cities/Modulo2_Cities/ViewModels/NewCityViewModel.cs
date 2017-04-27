using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using Plugin.Connectivity;
using Plugin.Media.Abstractions;
using System.IO;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
***REMOVED***
    public class NewCityViewModel : ViewModelBase
    ***REMOVED***
        private string _id;
        private string _name;
        private string _detail;
        private MediaFile _image;
        private string _imageUrl;
        
        public string Id
        ***REMOVED***
            get ***REMOVED*** return _id; ***REMOVED***
            set ***REMOVED*** _id = value; ***REMOVED***
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

        public MediaFile Image
        ***REMOVED***
            get ***REMOVED*** return _image; ***REMOVED***
            set
            ***REMOVED***
                _image = value;
                OnPropertyChanged("Image");
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

        public override void OnAppearing(object navigationContext)
        ***REMOVED***
            if (navigationContext is City)
            ***REMOVED***
                var city = (City)navigationContext;

                Id = city.Id;
                _imageUrl = city.Image;
                Name = city.Name;
                Detail = city.Detail;
        ***REMOVED***

            base.OnAppearing(navigationContext);
    ***REMOVED***

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
            var city = new City
            ***REMOVED***
                Id = Id,
                Name = Name,
                Detail = Detail,                
        ***REMOVED***;

            if (Image != null)
            ***REMOVED***
                if (!CrossConnectivity.Current.IsConnected)
                ***REMOVED***
                    _imageUrl = Image.Path;

                    using (MemoryStream ms = new MemoryStream())
                    ***REMOVED***
                        Image.GetStream().CopyTo(ms);
                        city.OfflineImage = ms.ToArray();
                ***REMOVED***
            ***REMOVED***
                else
                ***REMOVED***
                    _imageUrl = await BlobService.GetInstance().UploadPhotoAsync(Image);
            ***REMOVED***
        ***REMOVED***

            city.Image = _imageUrl;

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
