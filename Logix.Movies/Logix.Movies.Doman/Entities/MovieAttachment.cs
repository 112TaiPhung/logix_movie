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
    public class MovieAttachment : DomainEntity<Guid>
    {
        public Guid MovieId { get; set; }
        [Required]
        [MaxLength(ListBaseEntityConsts.NameMaxLength)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(ListBaseEntityConsts.NameMaxLength)]
        public string FilePath { get; set; }

        [Required]
        [MaxLength(5)]
        public string FileType { get; set; }

        public bool IsAvatar { get; set; } 

        [Required]
        public long FileSize { get; set; }
    }
}
