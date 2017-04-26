using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Modulo3_Backend
***REMOVED***
    public class RouteConfig
    ***REMOVED***
        public static void RegisterRoutes(RouteCollection routes)
        ***REMOVED***
            routes.IgnoreRoute("***REMOVED***resource***REMOVED***.axd/***REMOVED****pathInfo***REMOVED***");

            routes.MapRoute(
                name: "Default",
                url: "***REMOVED***controller***REMOVED***/***REMOVED***action***REMOVED***/***REMOVED***id***REMOVED***",
                defaults: new ***REMOVED*** action = "Index", id = UrlParameter.Optional ***REMOVED***
            );
    ***REMOVED***
***REMOVED***
***REMOVED***

