using System;

using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using Gcm.Client;
using CursoXamarin.Droid.Services;

namespace CursoXamarin.Droid
{
    [Activity(Label = "CursoXamarin", Icon = "@drawable/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        public static MainActivity CurrentActivity { get; private set; }

        protected override void OnCreate(Bundle bundle)
        {
            CurrentActivity = this;

            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(bundle);

            try
            {
                GcmClient.CheckDevice(this);
                GcmClient.CheckManifest(this);

                // Nos registramos por notificaciones push
                System.Diagnostics.Debug.WriteLine("Registrando...");
                GcmClient.Register(this, PushHandlerBroadcastReceiver.SENDER_IDS);
            }
            catch (Java.Net.MalformedURLException)
            {
                System.Diagnostics.Debug.WriteLine("Error creando el cliente. Verifica la URL.");
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }

            Microsoft.WindowsAzure.MobileServices.CurrentPlatform.Init();            

            global::Xamarin.Forms.Forms.Init(this, bundle);
            LoadApplication(new App());
        }
    }
}

