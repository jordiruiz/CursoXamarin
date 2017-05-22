using Microsoft.Azure.Mobile.Server;
using Modulo3_Backend.DataObjects;
using Modulo3_Backend.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using System.Collections.Generic;
using Microsoft.Azure.NotificationHubs;
using Microsoft.Azure.Mobile.Server.Config;

namespace Modulo3_Backend.Controllers
{
    public class CityController : TableController<City>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<City>(context, Request);
        }

        // GET tables/City
        public IQueryable<City> GetAllCity()
        {
            return Query();
        }

        // GET tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<City> GetCity(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<City> PatchCity(string id, Delta<City> patch)
        {
            return UpdateAsync(id, patch);
        }

        // POST tables/City
        public async Task<IHttpActionResult> PostCity(City item)
        {
            City current = await InsertAsync(item);

            // Obtenemos la configuración del proyecto del servidor
            HttpConfiguration config = this.Configuration;
            MobileAppSettingsDictionary settings =
            this.Configuration.GetMobileAppSettingsProvider().GetMobileAppSettings();

            // Obtenemos las credenciales del Notification Hubs de la Mobile App.
            string notificationHubName = settings.NotificationHubName;
            string notificationHubConnection = settings
            .Connections[MobileAppSettingsKeys.NotificationHubConnectionString].ConnectionString;

            // Creamos un nuevo cliente Notification Hub.
            NotificationHubClient hub = NotificationHubClient
            .CreateClientFromConnectionString(notificationHubConnection, notificationHubName);

            // Enviamos el mensaje.
            // Esto incluye APNS, GCM, WNS, y MPNS.
            Dictionary<string, string> templateParams = new Dictionary<string, string>();
            templateParams["messageParam"] = item.Name + " ha sido añadido.";

            try
            {
                // Enviamos la notificacion y obenemos el resultado
                var result = await hub.SendTemplateNotificationAsync(templateParams);

                // Escribimos el resultado en los logs.
                config.Services.GetTraceWriter().Info(result.State.ToString());
            }
            catch (System.Exception ex)
            {
                // Escribimos el fallo en los logs.
                config.Services.GetTraceWriter()
                .Error(ex.Message, null, "Push.SendAsync Error");
            }
            
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteCityItem(string id)
        {
            return DeleteAsync(id);
        }
    }
}