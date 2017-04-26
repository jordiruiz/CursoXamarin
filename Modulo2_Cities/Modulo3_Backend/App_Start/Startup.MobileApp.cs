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
***REMOVED***
    public partial class Startup
    ***REMOVED***
        public static void ConfigureMobileApp(IAppBuilder app)
        ***REMOVED***
            HttpConfiguration config = new HttpConfiguration();

            new MobileAppConfiguration()
                .UseDefaultConfiguration()
                .ApplyTo(config);

            // Use Entity Framework Code First to create database tables based on your DbContext
            Database.SetInitializer(new MobileServiceInitializer());

            MobileAppSettingsDictionary settings = config.GetMobileAppSettingsProvider().GetMobileAppSettings();

            if (string.IsNullOrEmpty(settings.HostName))
            ***REMOVED***
                app.UseAppServiceAuthentication(new AppServiceAuthenticationOptions
                ***REMOVED***
                    // This middleware is intended to be used locally for debugging. By default, HostName will
                    // only have a value when running in an App Service application.
                    SigningKey = ConfigurationManager.AppSettings["SigningKey"],
                    ValidAudiences = new[] ***REMOVED*** ConfigurationManager.AppSettings["ValidAudience"] ***REMOVED***,
                    ValidIssuers = new[] ***REMOVED*** ConfigurationManager.AppSettings["ValidIssuer"] ***REMOVED***,
                    TokenHandler = config.GetAppServiceTokenHandler()
            ***REMOVED***);
        ***REMOVED***

            app.UseWebApi(config);
    ***REMOVED***
***REMOVED***

    public class MobileServiceInitializer : CreateDatabaseIfNotExists<MobileServiceContext>
    ***REMOVED***
        protected override void Seed(MobileServiceContext context)
        ***REMOVED***
            string dataPath = HostingEnvironment.MapPath(@"~/App_Data/Cities.json");
            string rawData = File.ReadAllText(dataPath);
            var cities = JsonConvert.DeserializeObject<IEnumerable<City>>(rawData);

            Uri currentRequest = System.Web.HttpContext.Current.Request.Url;

            foreach (var city in cities)
            ***REMOVED***
                // Update default image urls using current domain name
                city.Image = $"https://***REMOVED***currentRequest.Authority***REMOVED***/Images/***REMOVED***city.Id***REMOVED***.png";
        ***REMOVED***

            context.Set<City>().AddRange(cities);

            base.Seed(context);
    ***REMOVED***
***REMOVED***
***REMOVED***

