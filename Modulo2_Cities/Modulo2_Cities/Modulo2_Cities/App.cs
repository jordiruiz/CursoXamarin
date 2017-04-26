using CursoXamarin.Infrastructure;
using CursoXamarin.Views;
using Ninject;
using Xamarin.Forms;

namespace CursoXamarin
***REMOVED***
    public class App : Application
    ***REMOVED***
        public static IKernel Container ***REMOVED*** get; set; ***REMOVED***

        public App()
        ***REMOVED***
            var kernel = new StandardKernel(new IOCModule());

            Container = kernel;

            MainPage = new NavigationPage(new MainView(null));            
    ***REMOVED***
        

        protected override void OnStart()
        ***REMOVED***
            // Handle when your app starts            
    ***REMOVED***

        protected override void OnSleep()
        ***REMOVED***
            // Handle when your app sleeps
    ***REMOVED***

        protected override void OnResume()
        ***REMOVED***
            // Handle when your app resumes
    ***REMOVED***
***REMOVED***
***REMOVED***
