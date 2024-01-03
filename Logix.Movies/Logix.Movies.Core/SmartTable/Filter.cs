using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.SmartTable
{
    public class Filter
    {
        public List<Filters> Filters { get; set; }

        public Logic Logic { get; set; }

        public Filter()
        {
            Logic = Logic.or;
        }
    }

    public class Filters
    {
        public string Operator { get; set; }

        public string Field { get; set; }

        public object Value { get; set; }
    }
}
