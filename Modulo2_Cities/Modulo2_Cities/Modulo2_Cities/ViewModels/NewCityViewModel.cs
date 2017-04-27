using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using Plugin.Connectivity;
using Plugin.Media.Abstractions;
using System.IO;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
{
    public class NewCityViewModel : ViewModelBase
    {
        private string _id;
        private string _name;
        private string _detail;
        private MediaFile _image;
        private string _imageUrl;
        
        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged("Name");
            }
        }

        public MediaFile Image
        {
            get { return _image; }
            set
            {
                _image = value;
                OnPropertyChanged("Image");
            }
        }

        public string Detail
        {
            get { return _detail; }
            set
            {
                _detail = value;
                OnPropertyChanged("Detail");
            }
        }

        public ICommand CameraCommand => new Command(CameraAsync);

        public ICommand SaveCommand => new Command(SaveAsync);

        public ICommand CancelCommand => new Command(Cancel);

        public override void OnAppearing(object navigationContext)
        {
            if (navigationContext is City)
            {
                var city = (City)navigationContext;

                Id = city.Id;
                _imageUrl = city.Image;
                Name = city.Name;
                Detail = city.Detail;
            }

            base.OnAppearing(navigationContext);
        }

        private async void CameraAsync()
        {
            var result = await PhotoService.GetInstance().PickPhotoAsync();

            if (result != null)
            {
                _image = result;                
            }
        }

        private async void SaveAsync()
        {
            var city = new City
            {
                Id = Id,
                Name = Name,
                Detail = Detail,                
            };

            if (Image != null)
            {
                if (!CrossConnectivity.Current.IsConnected)
                {
                    _imageUrl = Image.Path;

                    using (MemoryStream ms = new MemoryStream())
                    {
                        Image.GetStream().CopyTo(ms);
                        city.OfflineImage = ms.ToArray();
                    }
                }
                else
                {
                    _imageUrl = await BlobService.GetInstance().UploadPhotoAsync(Image);
                }
            }

            city.Image = _imageUrl;

            var _cityService = App.Container.GetService(typeof(IRepoService<City>)) as IRepoService<City>;

            await _cityService.AddOrUpdateCityAsync(city);

            NavigationService.Instance.NavigateBack();
        }

        private void Cancel()
        {
            NavigationService.Instance.NavigateBack();
        }
    }
}
