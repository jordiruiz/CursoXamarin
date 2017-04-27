using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursoXamarin.Services
{
    public interface IRepoService<T> where T:class,new()
    {
        Task<IEnumerable<T>> GetAll();
        Task AddOrUpdateCityAsync(T Item);
        Task DeleteCityItemAsync(T Item);
    }
}
