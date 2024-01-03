using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Services
{
    public interface IAuthenticatedUserService
    {
        string UserId { get; }
        string Email { get; }
        List<string> Roles { get; }
        int Gmt { get; }

        public string IpAddress { get; }
        List<string> Permissions { get; }

        bool HaveAllPermission(List<string> funcs);

        bool HaveAnyPermission(List<string> funcs);

        bool HavePermission(string func);
    }
}
