using System.Collections.Generic;
using System.Threading.Tasks;

namespace Modulo2_Cities.Services
***REMOVED***
    public interface IRepoService<T> where T:class,new()
    ***REMOVED***
        Task<IEnumerable<T>> GetAll();
***REMOVED***
***REMOVED***
