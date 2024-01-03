using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Accounts.Dtos
{
    public class AuthenticationRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string DeviceId { get; set; } = string.Empty;
    }
}
