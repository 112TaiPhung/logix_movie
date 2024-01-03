using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Accounts.Dtos
{
    public class AuthenticationDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }
        public List<string> Permissions { get; set; }
        public bool IsVerified { get; set; }
        public string Token { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset LockoutEnd { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }
        public string DeviceId { get; set; }
    }
}
