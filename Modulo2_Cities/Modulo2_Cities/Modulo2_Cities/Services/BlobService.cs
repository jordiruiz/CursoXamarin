using CursoXamarin.Infrastructure;
using Microsoft.WindowsAzure.Storage;
using Plugin.Media.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CursoXamarin.Services
***REMOVED***
    public class BlobService
    ***REMOVED***
        private static BlobService _instance;

        public static BlobService GetInstance()
        ***REMOVED***
            if (_instance == null)
            ***REMOVED***
                _instance = new BlobService();                
        ***REMOVED***

            return _instance;
    ***REMOVED***

        public async Task<string> UploadPhotoAsync(MediaFile photo)
        ***REMOVED***
            // Conectar con la cuenta Azure Storage.
            // NOTA: Se deben utilizar tokens SAS en lugar de Shared Keys en aplicaciones en producción.
            var storageAccount = CloudStorageAccount.Parse(GlobalSettings.BlobSharedKey);
            var blobClient = storageAccount.CreateCloudBlobClient();

            // Crear el contenedor blob si no existe.
            var container = blobClient.GetContainerReference(GlobalSettings.BlobContainerName);
            await container.CreateIfNotExistsAsync();

            // Subimos el blob a Azure Storage.
            var blob = container.GetBlockBlobReference(Guid.NewGuid().ToString());
            blob.Properties.ContentType = "image/png";
            await blob.UploadFromStreamAsync(photo.GetStream());

            return blob.Uri.ToString();
    ***REMOVED***
***REMOVED***
***REMOVED***
