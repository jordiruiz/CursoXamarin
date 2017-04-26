using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Web.Http;
using Microsoft.Azure.Mobile.Server;
using Microsoft.Azure.Mobile.Server.Authentication;
using Microsoft.Azure.Mobile.Server.Config;
using Modulo3_Backend.DataObjects;
using Modulo3_Backend.Models;
using Owin;
using System.Web.Hosting;
using System.IO;
using Newtonsoft.Json;

namespace Modulo3_Backend
{
    public partial class Startup
    {
        public static void ConfigureMobileApp(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            new MobileAppConfiguration()
                .UseDefaultConfiguration()
                .ApplyTo(config);

            // Use Entity Framework Code First to create database tables based on your DbContext
            Database.SetInitializer(new MobileServiceInitializer());

            MobileAppSettingsDictionary settings = config.GetMobileAppSettingsProvider().GetMobileAppSettings();

            if (string.IsNullOrEmpty(settings.HostName))
            {
                app.UseAppServiceAuthentication(new AppServiceAuthenticationOptions
                {
                    // This middleware is intended to be used locally for debugging. By default, HostName will
                    // only have a value when running in an App Service application.
                    SigningKey = ConfigurationManager.AppSettings["SigningKey"],
                    ValidAudiences = new[] { ConfigurationManager.AppSettings["ValidAudience"] },
                    ValidIssuers = new[] { ConfigurationManager.AppSettings["ValidIssuer"] },
                    TokenHandler = config.GetAppServiceTokenHandler()
                });
            }

            app.UseWebApi(config);
        }
    }

    public class MobileServiceInitializer : CreateDatabaseIfNotExists<MobileServiceContext>
    {
        protected override void Seed(MobileServiceContext context)
        {
            string dataPath = HostingEnvironment.MapPath(@"~/App_Data/Cities.json");
            string rawData = File.ReadAllText(dataPath);
            var cities = JsonConvert.DeserializeObject<IEnumerable<City>>(rawData);

            Uri currentRequest = System.Web.HttpContext.Current.Request.Url;

            foreach (var city in cities)
            {
                // Update default image urls using current domain name
                city.Image = $"https://{currentRequest.Authority}/Images/{city.Id}.png";
            }

            context.Set<City>().AddRange(cities);

            base.Seed(context);
        }
    }
}

