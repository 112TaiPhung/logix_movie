using Logix.Movies.Core.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Response
{
    public abstract class DomainResponse<T>
    {
        public T Id { get; set; }

        public string CreatedBy { get; set; }
        public DateTime Created { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModified { get; set; }
        public bool IsActive { get; set; }

        public string CreatedText => string.Format(SystemConstants.DateFormatddMMyyyyHHmmss0, Created);
        public string LastModifiedText => string.Format(SystemConstants.DateFormatddMMyyyyHHmmss0, LastModified);
    }
}
