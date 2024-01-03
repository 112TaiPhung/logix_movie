using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.LikeMovies.dtos
{
    public class LikeMovieForViewDto
    {
        public bool IsFavorite { get; set; }
        public Guid MovieId { get; set; }
         
        public DateTime? LastModified { get; set; }
    }
}
