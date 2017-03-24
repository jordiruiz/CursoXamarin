using Modulo2_Cities.Infrastructure;
using Modulo2_Cities.Views;
using Ninject;
using Xamarin.Forms;

namespace Modulo2_Cities
***REMOVED***
    public class App : Application
    ***REMOVED***
        public static IKernel Container ***REMOVED*** get; set; ***REMOVED***

        public App()
        ***REMOVED***
            var kernel = new StandardKernel(new IOCModule());

            Container = kernel;

            MainPage = new NavigationPage(new MainView());            
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
