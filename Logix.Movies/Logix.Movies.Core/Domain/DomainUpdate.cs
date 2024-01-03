using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Domain
{
    public class DomainUpdate<T>
    {
        public T Id { get; set; }
    }
}
