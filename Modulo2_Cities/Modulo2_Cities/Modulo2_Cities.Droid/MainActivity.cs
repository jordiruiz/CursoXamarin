using System;

using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;

namespace Modulo2_Cities.Droid
***REMOVED***
    [Activity(Label = "Modulo2_Cities", Icon = "@drawable/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    ***REMOVED***
        protected override void OnCreate(Bundle bundle)
        ***REMOVED***
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(bundle);

            Microsoft.WindowsAzure.MobileServices.CurrentPlatform.Init();            

            global::Xamarin.Forms.Forms.Init(this, bundle);
            LoadApplication(new App());
    ***REMOVED***
***REMOVED***
***REMOVED***

