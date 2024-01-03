using Microsoft.AspNetCore.Mvc;

namespace Logix.Movies.API.Authorization
{
    public class ClaimRequirementAttribute : TypeFilterAttribute
    {
        public ClaimRequirementAttribute(CommandCode CommandCode)
            : base(typeof(ClaimRequirementFilter))
        {
            Arguments = new object[] { CommandCode };
        }

        public ClaimRequirementAttribute(CommandCode[] CommandCodes)
            : base(typeof(ClaimRequirementFilter))
        {
            Arguments = new object[] { CommandCodes };
        }
    }
}
