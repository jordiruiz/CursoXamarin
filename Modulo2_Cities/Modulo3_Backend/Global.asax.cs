using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Modulo3_Backend
***REMOVED***
    public class MvcApplication : System.Web.HttpApplication
    ***REMOVED***
        protected void Application_Start()
        ***REMOVED***
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
    ***REMOVED***
***REMOVED***
***REMOVED***
