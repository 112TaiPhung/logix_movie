using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.Helpers;

namespace Logix.Movies.API.Authorization
{
    public class ClaimRequirementFilter : IAsyncAuthorizationFilter
    {
        private readonly ICacheService _cacheService;
        private readonly IAuthenticatedUserService _authenticatedUserService;
        private readonly CommandCode _commandCode;
        private readonly CommandCode[] _commandCodes;
        public ClaimRequirementFilter(
            ICacheService cacheService,
            IAuthenticatedUserService authenticatedUserService,
            CommandCode commandCode)
        {
            _cacheService = cacheService;
            _authenticatedUserService = authenticatedUserService;
            _commandCode = commandCode;
        }

        public ClaimRequirementFilter(
           ICacheService cacheService,
           IAuthenticatedUserService authenticatedUserService,
           CommandCode[] commandCodes)
        {
            _cacheService = cacheService;
            _authenticatedUserService = authenticatedUserService;
            _commandCodes = commandCodes;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var userId = _authenticatedUserService.UserId;
             
            var permissions = _authenticatedUserService.Permissions;

            if (_commandCodes != null && _commandCodes.Any())
            {
                string description = string.Join(" | ", _commandCodes.Select(e => e.GetEnumDescription()));
                if (permissions == null || !permissions.Any())
                {
                    context.Result = new JsonResult(new
                    {
                        succeeded = false,
                        message = $"Bạn không có quyền thao tác {description}",
                        title = "Forbidden",
                        data = string.Empty,
                        errors = new List<string>()
                    })
                    { StatusCode = StatusCodes.Status403Forbidden };
                }
                else
                {
                    var permission = permissions.FirstOrDefault(x => x == CommandCode.FULL_CONTROLL.ToString() || _commandCodes.Any(e => e.ToString() == x));
                    if (permission == null)
                    {
                        context.Result = new JsonResult(new
                        {
                            succeeded = false,
                            message = $"Bạn không có quyền thao tác {description}",
                            title = "Forbidden",
                            data = string.Empty,
                            errors = new List<string>()
                        })
                        { StatusCode = StatusCodes.Status403Forbidden };
                    }
                }
            }
            else
            {
                string description = _commandCode.GetEnumDescription();

                if (permissions == null || !permissions.Any())
                {
                    context.Result = new JsonResult(new
                    {
                        succeeded = false,
                        message = $"Bạn không có quyền thao tác {description}",
                        title = "Forbidden",
                        data = string.Empty,
                        errors = new List<string>()
                    })
                    { StatusCode = StatusCodes.Status403Forbidden };
                }
                else
                {
                    var permission = permissions.FirstOrDefault(x => x == CommandCode.FULL_CONTROLL.ToString() || x == _commandCode.ToString());
                    if (permission == null)
                    {
                        context.Result = new JsonResult(new
                        {
                            succeeded = false,
                            message = $"Bạn không có quyền thao tác {description}",
                            title = "Forbidden",
                            data = string.Empty,
                            errors = new List<string>()
                        })
                        { StatusCode = StatusCodes.Status403Forbidden };
                    }
                }
            }
        }
    }
}
