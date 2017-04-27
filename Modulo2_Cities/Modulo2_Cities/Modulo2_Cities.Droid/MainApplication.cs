using System;

using Android.App;
using Android.OS;
using Android.Runtime;
using Plugin.CurrentActivity;

namespace CursoXamarin.Droid
***REMOVED***
	//You can specify additional application information in this attribute
    [Application]
    public class MainApplication : Application, Application.IActivityLifecycleCallbacks
    ***REMOVED***
        public MainApplication(IntPtr handle, JniHandleOwnership transer)
          :base(handle, transer)
        ***REMOVED***
    ***REMOVED***

        public override void OnCreate()
        ***REMOVED***
            base.OnCreate();
            RegisterActivityLifecycleCallbacks(this);
            //A great place to initialize Xamarin.Insights and Dependency Services!
    ***REMOVED***

        public override void OnTerminate()
        ***REMOVED***
            base.OnTerminate();
            UnregisterActivityLifecycleCallbacks(this);
    ***REMOVED***

        public void OnActivityCreated(Activity activity, Bundle savedInstanceState)
        ***REMOVED***
            CrossCurrentActivity.Current.Activity = activity;
    ***REMOVED***

        public void OnActivityDestroyed(Activity activity)
        ***REMOVED***
    ***REMOVED***

        public void OnActivityPaused(Activity activity)
        ***REMOVED***
    ***REMOVED***

        public void OnActivityResumed(Activity activity)
        ***REMOVED***
            CrossCurrentActivity.Current.Activity = activity;
    ***REMOVED***

        public void OnActivitySaveInstanceState(Activity activity, Bundle outState)
        ***REMOVED***
    ***REMOVED***

        public void OnActivityStarted(Activity activity)
        ***REMOVED***
            CrossCurrentActivity.Current.Activity = activity;
    ***REMOVED***

        public void OnActivityStopped(Activity activity)
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***