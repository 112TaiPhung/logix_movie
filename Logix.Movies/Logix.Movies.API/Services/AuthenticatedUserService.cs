using Logix.Movies.API.Authorization;
using Logix.Movies.Core.Services;
using System.Security.Claims;

namespace Logix.Movies.API.Services
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
            var listRoles = httpContextAccessor.HttpContext?.User?.FindAll(c => c.Type == ClaimTypes.Role);
            if (listRoles != null)
            {
                Roles = listRoles.Select(x => x.Value).ToList();
            }
            Email = httpContextAccessor.HttpContext?.User?.FindFirst(c => c.Type == ClaimTypes.Email)?.Value;
            int.TryParse(httpContextAccessor.HttpContext?.User?.FindFirst(c => c.Type == "gmt")?.Value, out int gmt);
            if (gmt == 0) { gmt = 7; }
            Gmt = gmt;
            IpAddress = httpContextAccessor.HttpContext?.User?.FindFirst(c => c.Type == "ip")?.Value;
             
            var permissions = httpContextAccessor.HttpContext?.User?.FindAll("permissions").Select(e => e.Value).ToList();
            Permissions = permissions;
        }


        public string UserId { get; }
        public string Email { get; } 
        public List<string> Roles { get; } 
        public int Gmt { get; }
        public string IpAddress { get; }

        public List<string> Permissions { get; }

        /// <summary>
        /// Kiểm tra người dùng đang đăng nhập có các quyền trong list hay không
        /// </summary>
        /// <param name="funcs"></param>
        /// <returns></returns>
        public bool HaveAllPermission(List<string> funcs)
        {
            if (this.Permissions != null && (this.Permissions.Any(e => e == CommandCode.FULL_CONTROLL.ToString()) || !funcs.Except(this.Permissions).Any()))
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// Kiểm tra người dùng đang đăng nhập có bấ kỳ quyền trong list hay không
        /// </summary>
        /// <param name="funcs"></param>
        /// <returns></returns>
        public bool HaveAnyPermission(List<string> funcs)
        {
            if (this.Permissions != null && (this.Permissions.Any(e => e == CommandCode.FULL_CONTROLL.ToString()) || funcs.Any(e => this.Permissions.Contains(e))))
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// Kiểm tra người dùng đang đăng nhập có các quyền trong list hay không
        /// </summary>
        /// <param name="func"></param>
        /// <returns></returns>
        public bool HavePermission(string func)
        {
            if (this.Permissions != null && (this.Permissions.Any(e => e == CommandCode.FULL_CONTROLL.ToString()) || this.Permissions.Any(x => x == func)))
            {
                return true;
            }

            return false;
        }
    }
}
