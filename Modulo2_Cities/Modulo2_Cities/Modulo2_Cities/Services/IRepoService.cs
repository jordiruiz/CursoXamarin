using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursoXamarin.Services
***REMOVED***
    public interface IRepoService<T> where T:class,new()
    ***REMOVED***
        Task<IEnumerable<T>> GetAll();
        Task AddOrUpdateCityAsync(T Item);
        Task DeleteCityItemAsync(T Item);
***REMOVED***
***REMOVED***
