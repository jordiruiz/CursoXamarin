using CursoXamarin.Infrastructure;
using Microsoft.WindowsAzure.Storage;
using Plugin.Media.Abstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CursoXamarin.Services
{
    public class BlobService
    {
        private static BlobService _instance;

        public static BlobService GetInstance()
        {
            if (_instance == null)
            {
                _instance = new BlobService();                
            }

            return _instance;
        }

        public async Task<string> UploadPhotoAsync(MediaFile photo)
        {
            try
            {
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
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        public async Task<string> UploadPhotoAsync(byte[] photo)
        {
            try
            {
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
                await blob.UploadFromByteArrayAsync(photo,0,photo.Length);

                return blob.Uri.ToString();
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
