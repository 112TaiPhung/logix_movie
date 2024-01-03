using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.Movies.Dtos
{
    public class CreateMovieDto
    { 
        public string Name { get; set; }
         
        public string? Code { get; set; }

        public string? Description { get; set; }

        public IFormFile FileAvatar { get; set; }
        public IFormFile FileMovie { get; set; }
    }
}
