using Xamarin.Forms;

namespace Modulo2_Cities.ViewModels.Base
{
    public class ViewModelBase : BindableObject
    {
        public virtual void OnAppearing(object navigationContext)
        {
        }

        public virtual void OnDisappearing()
        {
        }
    }
}
