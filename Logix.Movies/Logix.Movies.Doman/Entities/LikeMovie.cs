using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Logix.Movies.Core.Domain;

namespace Logix.Movies.Domain.Entities
{
    public class LikeMovie : DomainEntity<Guid>
    {
        public bool IsFavorite { get; set; }
        public Guid MovieId { get; set; }
    }
}
