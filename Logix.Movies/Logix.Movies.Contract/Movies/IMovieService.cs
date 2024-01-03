using Logix.Movies.Contract.Movies.Dtos;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Logix.Movies.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Movies
{
    public interface IMovieService : IAppBaseService<Movie, Guid,CreateMovieDto, UpdateMovieDto, MovieForViewDto>
    {
        Task<MovieForViewDto> LikeMovie(Guid id, bool isFavorite);

        Task<PagedResponse<IEnumerable<MovieForViewDto>>> GetMyMoviePaging(SmartTableParam param);
    }
}
