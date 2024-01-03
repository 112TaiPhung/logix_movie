using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Logix.Movies.Core.Response;

namespace Logix.Movies.Core.SmartTable
{
    public class SmartTableParam
    {
        public Pagination? Pagination { get; set; }

        public List<Filter>? GroupFilters { get; set; }
        public List<string>? Includes { get; set; }

        public SelectedId? Selected { get; set; }

        public virtual ICollection<Sort>? Sort { get; set; }
    }
}
