using Plugin.Media;
using Plugin.Media.Abstractions;
using System.Threading.Tasks;

namespace CursoXamarin.Services
{
    public class PhotoService
    {
        private static PhotoService _instance;

        public static PhotoService GetInstance()
        {
            if (_instance == null)
            {
                _instance = new PhotoService();                
            }

            return _instance;
        }

        public async Task<MediaFile> PickPhotoAsync()
        {
            try
            {
                MediaFile image = null;

                if (!CrossMedia.Current.IsCameraAvailable || !CrossMedia.Current.IsTakePhotoSupported)
                {
                    return image;
                }

                var file = await CrossMedia.Current.PickPhotoAsync();

                if (file != null && file.Path != null)
                {
                    image = file;
                }

                return image;
            }
            catch (TaskCanceledException)
            {
                return null;
            }
        }
    }
}
