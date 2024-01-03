using Logix.Movies.API.Authorization;
using Logix.Movies.Contract.Movies;
using Logix.Movies.Contract.Movies.Dtos;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Logix.Movies.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Logix.Movies.API.Controllers
{
    [ControllerName("movies")]
    [Route("api/movies")]
    public class MoviesController : BaseController<Movie, Guid, CreateMovieDto, UpdateMovieDto, MovieForViewDto, IMovieService>
    {
        private readonly IMovieService _appBaseService;
        private readonly HttpClient _httpClient;
        public MoviesController(IMovieService appBaseService,
            IAuthenticatedUserService authenticatedUserService) : base(appBaseService, authenticatedUserService)
        {
            _appBaseService = appBaseService;
            _httpClient = new HttpClient();
        }

        [HttpPost]
        [Authorize]
        public override async Task<IActionResult> Create([FromForm] CreateMovieDto request)
        {
            if (!HasPermission(CreatePolicyName))
            {
                return ForwardForbid(CreatePolicyName);
            }
            var result = await _appBaseService.Create(request);
            return Ok(new Response<MovieForViewDto>(result));
        }

        [HttpPost("{id}/like-movie")]
        [Authorize]
        public async Task<IActionResult> LikeMovie(Guid id, bool isFavorite)
        {
            if (!HasPermission(CreatePolicyName))
            {
                return ForwardForbid(CreatePolicyName);
            }
            var result = await _appBaseService.LikeMovie(id, isFavorite);
            return Ok(new Response<MovieForViewDto>(result));
        }

        [Authorize]
        [HttpPost("my-movies")]
        public async Task<IActionResult> GetMyMovies(SmartTableParam param)
        {
            var result = await _appBaseService.GetMyMoviePaging(param);
            return Ok(result);
        }

        [HttpGet("download")]
        public async Task<IActionResult> DownloadFileFromUrl(string fileUrl)
        {
            try
            {
                // Download file content from the provided URL
                var fileContent = await _httpClient.GetByteArrayAsync(fileUrl);

                // Extract file name from the URL or provide a default name
                var fileName = GetFileNameFromUrl(fileUrl) ?? "downloaded_file";

                // Determine content type based on the file extension or provide a default content type
                var contentType = GetContentTypeFromFileName(fileName) ?? "application/octet-stream";

                // Return the file as a content result
                return File(fileContent, contentType, fileName);
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., invalid URL, network issues)
                return BadRequest($"Error downloading file: {ex.Message}");
            }
        }

        private string GetFileNameFromUrl(string url)
        {
            Uri uri;
            if (Uri.TryCreate(url, UriKind.Absolute, out uri))
            {
                return System.IO.Path.GetFileName(uri.LocalPath);
            }
            return null;
        }

        // Helper method to determine content type based on file extension
        private string GetContentTypeFromFileName(string fileName)
        {
            var fileExtension = System.IO.Path.GetExtension(fileName).ToLowerInvariant();
            switch (fileExtension)
            {
                case ".mp4":
                    return "video/mp4";
                case ".pdf":
                    return "application/pdf";
                case ".txt":
                    return "text/plain";
                case ".png":
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                // Add more cases based on the file types you expect
                default:
                    return null; // Use a default content type or return null for "application/octet-stream"
            }
        }
    }
}
