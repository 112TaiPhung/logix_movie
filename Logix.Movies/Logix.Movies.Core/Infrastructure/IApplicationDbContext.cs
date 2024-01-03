using Logix.Movies.Core.Wrappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Infrastructure
{
    public interface IApplicationDbContext
    {
        DbSet<T> Repository<T>() where T : class;
        void Dispose();
        Task<int> ExecuteSqlRawAsync(string sql, object[] parameters);

        Task<IReadOnlyList<T>> GetAllAsync<T>(Expression<Func<T, object>>[] includes) where T : class;

        Task<IReadOnlyList<T>> GetAllAsync<T>(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes) where T : class;

        Task<int> CountAsync<T>(Expression<Func<T, bool>> predicate) where T : class;

        Task<T> FirstOrDefaultAsync<T>(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes) where T : class;

        Task<PagedResponse<IEnumerable<T>>> GetPagedReponseAsync<T>(Expression<Func<T, bool>> predicate, int pageNumber = 1, int pageSize = 50, bool isPaging = false, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includeProperties) where T : class;
    }
}
