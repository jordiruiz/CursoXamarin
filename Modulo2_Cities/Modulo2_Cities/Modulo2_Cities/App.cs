using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Modulo2_Cities
***REMOVED***
    public class App : Application
    ***REMOVED***
        public App()
        ***REMOVED***
            // The root page of your application
            var content = new ContentPage
            ***REMOVED***
                Title = "Modulo2_Cities",
                Content = new StackLayout
                ***REMOVED***
                    VerticalOptions = LayoutOptions.Center,
                    Children = ***REMOVED***
                        new Label ***REMOVED***
                            HorizontalTextAlignment = TextAlignment.Center,
                            Text = "Welcome to Xamarin Forms!"
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***;

            MainPage = new NavigationPage(content);
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
