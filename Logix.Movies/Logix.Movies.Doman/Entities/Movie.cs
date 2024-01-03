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
    public class Movie : DomainEntity<Guid>
    {
        [MaxLength(ListBaseEntityConsts.CodeMaxLength)]
        public string? Code { get; set; }
        [Required]
        [MaxLength(ListBaseEntityConsts.NameMaxLength)]
        public string Name { get; set; }
        public string? Description { get; set; }
         
        public List<MovieAttachment> MovieAttachments { get; set; }
        public List<LikeMovie> LikeMovies { get; set; }
    }
}
