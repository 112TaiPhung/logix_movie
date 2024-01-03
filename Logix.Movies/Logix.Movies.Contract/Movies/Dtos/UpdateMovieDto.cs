using Logix.Movies.Core.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Movies.Dtos
{
    public class UpdateMovieDto : DomainUpdate<Guid>
    { 
        public string Name { get; set; } 
        public string Description { get; set; }
    }
}
