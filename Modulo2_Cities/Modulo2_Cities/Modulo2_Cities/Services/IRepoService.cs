using System.Collections.ObjectModel;

namespace Modulo2_Cities.Services
***REMOVED***
    public interface IRepoService<T> where T:class,new()
    ***REMOVED***
        ObservableCollection<T> GetAll();
***REMOVED***
***REMOVED***
