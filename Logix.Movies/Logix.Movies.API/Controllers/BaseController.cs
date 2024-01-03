using Logix.Movies.API.Authorization;
using Logix.Movies.API.Exceptions;
using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Exceptions;
using Logix.Movies.Core.Helpers;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Logix.Movies.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity, TPrimaryKey, TCreate, TUpdate, TViewOutput, TService> : ControllerBase
        where TCreate : class
        where TPrimaryKey : struct
        where TEntity : DomainEntity<TPrimaryKey>
        where TUpdate : DomainUpdate<TPrimaryKey>
        where TViewOutput : DomainResponse<TPrimaryKey>
        where TService : IAppBaseService<TEntity, TPrimaryKey, TCreate, TUpdate, TViewOutput>
    {
        protected virtual string GetPolicyName { get; set; }
        protected virtual string GetListPolicyName { get; set; }
        protected virtual string CreatePolicyName { get; set; }
        protected virtual string UpdatePolicyName { get; set; }
        protected virtual string DeletePolicyName { get; set; }
        protected virtual string CacheKey { get; set; }


        private readonly TService _appBaseService;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public BaseController(TService appBaseService,
            IAuthenticatedUserService authenticatedUserService)
        {
            _appBaseService = appBaseService;
            _authenticatedUserService = authenticatedUserService;
        }


        [Authorize]
        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(TPrimaryKey id)
        {
            if (!HasPermission(GetPolicyName))
            {
                return ForwardForbid(GetPolicyName);
            }
            var result = await _appBaseService.GetById(id);
            return Ok(new Response<TViewOutput>(result));
        }

        [Authorize]
        [HttpPost("paging")]
        public async Task<IActionResult> Paging([FromBody] SmartTableParam param)
        {
            if (!HasPermission(GetListPolicyName))
            {
                return ForwardForbid(GetListPolicyName);
            }
            var result = await _appBaseService.GetPaging(param);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public virtual async Task<IActionResult> Create([FromBody] TCreate request)
        {
            if (!HasPermission(CreatePolicyName))
            {
                return ForwardForbid(CreatePolicyName);
            }
            var result = await _appBaseService.Create(request);
            return Ok(new Response<TViewOutput>(result));
        }

        [HttpPut]
        [Authorize]
        public virtual async Task<IActionResult> Update(TUpdate request)
        {
            if (!HasPermission(UpdatePolicyName))
            {
                return ForwardForbid(UpdatePolicyName);
            }

            var result = await _appBaseService.Update(request);
            return Ok(new Response<TViewOutput>(result));
        }

        [Authorize]
        [HttpPut("{id}/change-status")]
        public virtual async Task<IActionResult> ChangeStatus(TPrimaryKey id, bool isActive)
        {
            if (!HasPermission(UpdatePolicyName))
            {
                return ForwardForbid(UpdatePolicyName);
            }
            var result = await _appBaseService.ChangeIsActive(id, isActive);
            return Ok(new Response<TViewOutput>(result));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(TPrimaryKey id)
        {
            if (!HasPermission(DeletePolicyName))
            {
                return ForwardForbid(DeletePolicyName);
            }
            var result = await _appBaseService.Delete(id);
            return Ok(new Response<bool>(result));
        }
          
        protected bool HasPermission(string func)
        {
            bool isAccess = _authenticatedUserService.HavePermission(func);
            if (!isAccess && !string.IsNullOrEmpty(func))
            {
                return false;
            }
            return true;
        }

        protected IActionResult ForwardForbid(string func)
        {
            return new ForbidActionResult($"Bạn không có quyền thao tác {EnumHelper.GetDescriptionFromKey<CommandCode>(func)}");
        }
    }
}