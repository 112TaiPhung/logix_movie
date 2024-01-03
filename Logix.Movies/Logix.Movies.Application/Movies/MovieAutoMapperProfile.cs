using AutoMapper;
using Logix.Movies.Contract.LikeMovies.dtos;
using Logix.Movies.Contract.MovieAttachments.Dtos;
using Logix.Movies.Contract.Movies.Dtos;
using Logix.Movies.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Application.Movies
{
    public class MovieAutoMapperProfile : Profile
    {
        public MovieAutoMapperProfile() {

            CreateMap<Movie, MovieForViewDto>(MemberList.None);
            CreateMap<CreateMovieDto, Movie>(MemberList.None);
            CreateMap<UpdateMovieDto, Movie>(MemberList.None);
            CreateMap<MovieAttachment, MovieAttachmentForViewDto>(MemberList.None);
            CreateMap<LikeMovie, LikeMovieForViewDto>(MemberList.None);
        }
    }
}
