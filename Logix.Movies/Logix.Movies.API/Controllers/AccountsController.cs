using Logix.Movies.API.Authorization;
using Logix.Movies.Application.Accounts;
using Logix.Movies.Contract.Accounts;
using Logix.Movies.Contract.Accounts.Dtos;
using Logix.Movies.Contract.Movies;
using Logix.Movies.Contract.Movies.Dtos;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Logix.Movies.API.Controllers
{
    [ControllerName("accounts")]
    [Route("api/accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _appBaseService;
        private readonly IConfiguration _configuration;
        public AccountsController(IAccountService appBaseService, IConfiguration configuration,
            IAuthenticatedUserService authenticatedUserService)
        {
            _appBaseService = appBaseService;
            _configuration = configuration;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticationRequestDto request)
        {
            return Ok(await _appBaseService.AuthenticateAsync(request, GenerateIPAddress(), _configuration));
        }

        private string GenerateIPAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
         
        [HttpPost("register")]
        public async Task<IActionResult> CreateAsync([FromBody] RegisterAccountDto request)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _appBaseService.RegisterAsync(request, origin));
        }
    }
}
