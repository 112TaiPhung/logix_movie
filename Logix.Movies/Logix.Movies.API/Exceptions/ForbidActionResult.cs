using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Logix.Movies.API.Exceptions
{
    public class ForbidActionResult : ObjectResult
    {
        public ForbidActionResult(int statusCode = (int)HttpStatusCode.Forbidden, string errorMessage = null) :
            base(errorMessage ?? "User is not allowed to enter this page.")
        {
            StatusCode = statusCode;
        }

        public ForbidActionResult(string errorMessage = null) :
            base(errorMessage ?? "User is not allowed to enter this page.")
        {
            StatusCode = (int)HttpStatusCode.Forbidden;
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            await base.ExecuteResultAsync(context);
        }
    }
}
