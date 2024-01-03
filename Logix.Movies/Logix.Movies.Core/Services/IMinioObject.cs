using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Services
{
    public interface IMinioObject
    {
        Task<string> PutObjectAsync(string bucketName, IFormFile file);
    }
}
