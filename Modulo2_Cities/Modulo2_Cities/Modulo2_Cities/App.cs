using CursoXamarin.Infrastructure;
using CursoXamarin.Views;
using Ninject;
using Xamarin.Forms;

namespace CursoXamarin
{
    public class App : Application
    {
        public static IKernel Container { get; set; }

        public App()
        {
            var kernel = new StandardKernel(new IOCModule());

            Container = kernel;

            MainPage = new NavigationPage(new MainView(null));            
        }
        

        protected override void OnStart()
        {
            // Handle when your app starts            
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
