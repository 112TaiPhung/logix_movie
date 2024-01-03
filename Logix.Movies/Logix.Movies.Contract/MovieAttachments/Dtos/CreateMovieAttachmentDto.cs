using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Contract.MovieAttachments.Dtos
{
    public class CreateMovieAttachmentDto
    {
        public string FileName { get; set; }

        public string FilePath { get; set; }

        public string FileType { get; set; }

        public long FileSize { get; set; }

        public bool IsAvatar { get; set; }
    }
}
