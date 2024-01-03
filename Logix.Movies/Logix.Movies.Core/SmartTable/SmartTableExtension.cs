using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.SmartTable
{
    public static class SmartTableExtension
    {
        public static IQueryable<TModel> AppendFilter<TModel>(this IQueryable<TModel> query, List<Filter> groupFilter)
        {
            foreach (var filter in groupFilter)
            {
                List<Filters> filters = filter.Filters != null ? filter.Filters : new List<Filters>();
                int filterLength = 0;
                if (filters != null)
                {
                    filterLength = filters.Count();
                }
                else
                {
                    filters = new List<Filters>();
                }

                //if (!filter.Any(e => e.Field == "IsDelete"))
                //{
                //    filter.Add(new Filters() { Field = "IsDelete", Operator = WhereOperation.Equal, IgnoreCase = true });
                //}

                if (filterLength > 0)
                {
                    foreach (var item in filters)
                    {
                        query = query.FilterByName(filter);
                    }
                }
            }
            return query;
        }
    }
}
