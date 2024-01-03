using AutoMapper;
using Logix.Movies.Contract.Movies;
using Logix.Movies.Contract.Movies.Dtos;
using Logix.Movies.Core.Exceptions;
using Logix.Movies.Core.Helpers;
using Logix.Movies.Core.Infrastructure;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Logix.Movies.Domain.Entities;
using Logix.Movies.Infrastructure;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Application.Movies
{
    public class MovieService : AppBaseService<Movie, Guid, CreateMovieDto, UpdateMovieDto, MovieForViewDto>, IMovieService
    {
        private readonly IMinioObject _minioObject;
        public MovieService(IGenericDbContext<ApplicationDbContext> unitOfWork, IMapper mapper,
            IAuthenticatedUserService authenticatedUserService, IMinioObject minioObject) : base(mapper, unitOfWork, authenticatedUserService)
        {
            _minioObject = minioObject;
        }

        public override async Task<PagedResponse<IEnumerable<MovieForViewDto>>> GetPaging(SmartTableParam param)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var queryable = context.Repository<Movie>()
                    .Include(e => e.MovieAttachments)
                    .Include(e => e.LikeMovies).AsQueryable();
                queryable = queryable.Where(e => !e.IsDelete);

                var result = await _unitOfWork.GetPagedReponseAsync(queryable, param);
                var response = mapper.Map<IEnumerable<MovieForViewDto>>(result.Data);
                var gmt = _authenticatedUserService.Gmt;
                foreach (var item in response)
                {
                    item.Created = item.Created.ToLocal(gmt);
                    item.LastModified = item.LastModified.ToLocal(gmt);
                    item.CountDisLike = item.LikeMovies.Count(e => !e.IsFavorite);
                    item.CountLike = item.LikeMovies.Count(e => e.IsFavorite);
                    item.LinkAvatar = item.MovieAttachments.FirstOrDefault(e => e.IsAvatar)?.FilePath;
                    item.LinkVideo = item.MovieAttachments.FirstOrDefault(e => !e.IsAvatar)?.FilePath;
                }
                return new PagedResponse<IEnumerable<MovieForViewDto>>(response, result.PageNumber, result.PageSize, result.RowCount);
            }
        }

        public async Task<PagedResponse<IEnumerable<MovieForViewDto>>> GetMyMoviePaging(SmartTableParam param)
        {
            if (param.GroupFilters == null)
            {
                param.GroupFilters = new List<Filter>();
            }
            param.GroupFilters.Add(new Filter()
            {
                Filters = new List<Filters>() {
                    new Filters() { Field = "CreateBy", Operator = "eq", Value = _authenticatedUserService.Email }
                }
            });
            var result = await base.GetPaging(param);

            return result;
        }

        public override async Task<MovieForViewDto> GetById(Guid id)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var repository = context.Repository<Movie>().AsQueryable();
                repository = repository.Include(e => e.MovieAttachments);
                repository = repository.Include(e => e.LikeMovies);
                var entity = await repository.FirstOrDefaultAsync(e => e.Id.Equals(id) && !e.IsDelete);

                if (entity == null)
                {
                    throw new ApiException("Id không hợp lệ.");
                }

                var result = mapper.Map<MovieForViewDto>(entity);

                var gmt = _authenticatedUserService.Gmt;
                result.Created = result.Created.ToLocal(gmt);
                result.LastModified = result.LastModified.ToLocal(gmt);
                result.CountDisLike = result.LikeMovies.Count(e => !e.IsFavorite);
                result.CountLike = result.LikeMovies.Count(e => e.IsFavorite);
                result.LinkVideo = result.MovieAttachments.FirstOrDefault(e => !e.IsAvatar)?.FilePath;
                return result;
            }
        }

        public async override Task<MovieForViewDto> Create(CreateMovieDto input)
        {
            using (var context = _unitOfWork.GetContext())
            {
                await CheckDataInsert(input, context);

                var entity = MapToEntity(input);

                await context.AddAsync(entity, false);

                if (input.FileAvatar != null)
                {
                    string fileName = Path.GetFileNameWithoutExtension(input.FileAvatar.FileName);
                    string ext = Path.GetExtension(input.FileAvatar.FileName);
                    string url = await _minioObject.PutObjectAsync("movies", input.FileAvatar);

                    MovieAttachment movieAttachment = new MovieAttachment()
                    {
                        MovieId = entity.Id,
                        IsAvatar = true,
                        FileName = fileName,
                        FilePath = url,
                        FileSize = input.FileAvatar.Length,
                        FileType = ext
                    };

                    await context.AddAsync(movieAttachment, false);
                }

                if (input.FileMovie != null)
                {
                    string fileName = Path.GetFileNameWithoutExtension(input.FileMovie.FileName);
                    string ext = Path.GetExtension(input.FileMovie.FileName);
                    string url = await _minioObject.PutObjectAsync("movies", input.FileMovie);

                    MovieAttachment movieAttachment = new MovieAttachment()
                    {
                        MovieId = entity.Id,
                        IsAvatar = false,
                        FileName = fileName,
                        FilePath = url,
                        FileSize = input.FileMovie.Length,
                        FileType = ext
                    };

                    await context.AddAsync(movieAttachment, false);
                }
                
                await context.SaveChangesAsync();

                return mapper.Map<MovieForViewDto>(entity);
            }
        }
         
        public async Task<MovieForViewDto> LikeMovie(Guid id, bool isFavorite)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var entity = await context.FirstOrDefaultAsync<LikeMovie>(e => e.MovieId == id && e.CreatedBy == _authenticatedUserService.Email);
                if (entity != null)
                {
                    entity.IsFavorite = isFavorite;
                    await context.UpdateAsync(entity, false);
                }
                else
                {
                    entity = new LikeMovie()
                    {
                        MovieId = id,
                        IsFavorite = isFavorite
                    };
                    await context.AddAsync(entity, false);
                }
                await context.SaveChangesAsync();
                var result = await GetById(id);
                return result;
            }
        }

        public override async Task CheckDataInsert(CreateMovieDto input, ApplicationDbContext context)
        {
            if (string.IsNullOrEmpty(input.Name))
            {
                throw new ApiException("Vui lòng nhập tên");
            }
        }

        public override async Task CheckDataUpdate(UpdateMovieDto input, ApplicationDbContext context)
        {
            if (true)
            {

            }
            if (string.IsNullOrEmpty(input.Name))
            {
                throw new ApiException("Vui lòng nhập tên");
            }
        }
    }
}
