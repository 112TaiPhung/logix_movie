using Logix.Movies.Core.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [MaxLength(ListBaseEntityConsts.NameMaxLength)]
        public string? FullName { get; set; }
    }
}
