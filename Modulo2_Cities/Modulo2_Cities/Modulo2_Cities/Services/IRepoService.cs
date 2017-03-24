using System.Collections.ObjectModel;

namespace Modulo2_Cities.Services
{
    public interface IRepoService<T> where T:class,new()
    {
        ObservableCollection<T> GetAll();
    }
}
