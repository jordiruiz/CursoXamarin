using Microsoft.Azure.Mobile.Server;
using Modulo3_Backend.DataObjects;
using Modulo3_Backend.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;

namespace Modulo3_Backend.Controllers
***REMOVED***
    public class CityController : TableController<City>
    ***REMOVED***
        protected override void Initialize(HttpControllerContext controllerContext)
        ***REMOVED***
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<City>(context, Request);
    ***REMOVED***

        // GET tables/City
        public IQueryable<City> GetAllCity()
        ***REMOVED***
            return Query();
    ***REMOVED***

        // GET tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<City> GetCity(string id)
        ***REMOVED***
            return Lookup(id);
    ***REMOVED***

        // PATCH tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<City> PatchCity(string id, Delta<City> patch)
        ***REMOVED***
            return UpdateAsync(id, patch);
    ***REMOVED***

        // POST tables/City
        public async Task<IHttpActionResult> PostCity(City item)
        ***REMOVED***
            City current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new ***REMOVED*** id = current.Id ***REMOVED***, current);
    ***REMOVED***

        // DELETE tables/City/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteCityItem(string id)
        ***REMOVED***
            return DeleteAsync(id);
    ***REMOVED***
***REMOVED***
***REMOVED***