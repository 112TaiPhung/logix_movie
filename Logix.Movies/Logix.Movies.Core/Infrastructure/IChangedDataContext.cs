using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Infrastructure
{
    public interface IChangedDataContext
    {
        Task<T> AddAsync<T>(T entity, bool isCommit = true) where T : class;

        Task<IReadOnlyList<T>> AddRangeAsync<T>(IReadOnlyList<T> entities, bool isCommit = true) where T : class;

        Task<IEnumerable<T>> AddRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class;

        Task<T> UpdateAsync<T>(T entity, bool isCommit = true) where T : class;

        Task<IReadOnlyList<T>> UpdateRangeAsync<T>(IReadOnlyList<T> entities, bool isCommit = true) where T : class;

        Task<IEnumerable<T>> UpdateRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class;

        Task HardDeleteRangeAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class;

        Task HardDeleteRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class;

        Task HardDeleteAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class;

        Task DeleteRangeAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class;
    }
}
