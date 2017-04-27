using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Modulo3_Backend.Startup))]

namespace Modulo3_Backend
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureMobileApp(app);
        }
    }
}