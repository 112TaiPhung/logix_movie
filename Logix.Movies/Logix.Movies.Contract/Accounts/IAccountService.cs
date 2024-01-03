using Logix.Movies.Contract.Accounts.Dtos;
using Logix.Movies.Core.Wrappers;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Accounts
{
    public interface IAccountService
    {
        Task<Response<AuthenticationDto>> AuthenticateAsync(AuthenticationRequestDto request, string ipAddress, IConfiguration configuration);

        Task<Response<Guid>> RegisterAsync(RegisterAccountDto request, string origin);
    }
}
