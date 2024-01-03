using Logix.Movies.Contract.LikeMovies.dtos;
using Logix.Movies.Contract.MovieAttachments.Dtos;
using Logix.Movies.Core.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Movies.Dtos
{
    public class MovieForViewDto : DomainResponse<Guid>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string? LinkAvatar { get; set; }
        public string? LinkVideo { get; set; }

        public int CountLike {  get; set; } 
        public int CountDisLike {  get; set; } 

        public List<LikeMovieForViewDto> LikeMovies {  get; set; } 
        public List<MovieAttachmentForViewDto> MovieAttachments {  get; set; } 
    }
}
