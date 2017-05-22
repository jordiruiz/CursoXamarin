using Microsoft.Azure.Mobile.Server;
using System.ComponentModel.DataAnnotations.Schema;

namespace Modulo3_Backend.DataObjects
{
    public class City : EntityData
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Detail { get; set; }
        [NotMapped]
        public byte[] OfflineImage { get; set; }
    }    
}
