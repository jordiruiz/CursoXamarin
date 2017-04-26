using System.Collections.Generic;
using System.Threading.Tasks;

namespace Modulo2_Cities.Services
{
    public interface IRepoService<T> where T:class,new()
    {
        Task<IEnumerable<T>> GetAll();
    }
}
