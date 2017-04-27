using Plugin.Media;
using Plugin.Media.Abstractions;
using System.Threading.Tasks;

namespace CursoXamarin.Services
***REMOVED***
    public class PhotoService
    ***REMOVED***
        private static PhotoService _instance;

        public static PhotoService GetInstance()
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new PhotoService();                
        ***REMOVED***

            return _instance;
    ***REMOVED***

        public async Task<MediaFile> PickPhotoAsync()
        ***REMOVED***
            try
            ***REMOVED***
                MediaFile image = null;

                if (!CrossMedia.Current.IsCameraAvailable || !CrossMedia.Current.IsTakePhotoSupported)
                ***REMOVED***
                    return image;
            ***REMOVED***

                var file = await CrossMedia.Current.PickPhotoAsync();

                if (file != null && file.Path != null)
                ***REMOVED***
                    image = file;
            ***REMOVED***

                return image;
        ***REMOVED***
            catch (TaskCanceledException)
            ***REMOVED***
                return null;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
