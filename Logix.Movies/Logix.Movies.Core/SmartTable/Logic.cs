using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.SmartTable
{
    public class Logic
    {
        private Logic(string value) { Value = value; }

        public string Value { get; set; }

        public static Logic or { get { return new Logic("or"); } }

        public static Logic and { get { return new Logic("and"); } }
    }
}
