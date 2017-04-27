using CursoXamarin.Models;
using CursoXamarin.Services;
using CursoXamarin.ViewModels.Base;
using Plugin.Media.Abstractions;
using System.Windows.Input;
using Xamarin.Forms;

namespace CursoXamarin.ViewModels
{
    public class NewCityViewModel : ViewModelBase
    {
        private string _name;
        private string _detail;
        private MediaFile _image;

        public MediaFile Image
        {
            get { return _image; }
            set
            {
                _image = value;
                OnPropertyChanged("ImageUrl");
            }
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
            var ImageUrl = await BlobService.GetInstance().UploadPhotoAsync(Image);

            var city = new City
            {
                Name = Name,
                Image = ImageUrl,
                Detail = Detail
            };

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
