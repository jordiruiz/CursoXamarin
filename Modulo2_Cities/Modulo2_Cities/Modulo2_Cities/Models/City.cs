using Microsoft.WindowsAzure.MobileServices;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace CursoXamarin.Models
{
    public class City
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Detail { get; set; }
        [Version]
        public string AzureVersion { get; set; }        
        public byte[] OfflineImage { get; set; }
    }    
}
