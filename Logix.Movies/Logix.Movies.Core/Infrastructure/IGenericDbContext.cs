using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Infrastructure
{
    public interface IGenericDbContext<T> where T : Microsoft.EntityFrameworkCore.DbContext, IApplicationDbContext, IDisposable
    {
        DatabaseFacade Database { get; }
        DbSet<T> Repository<T>() where T : class;

        void Dispose();
        Task<int> ExecuteSqlRawAsync(string sql, params object[] parameters);

        Task<int> ExecuteSqlRawAsync(string sql);

        Task<IEnumerable<TElement>> SqlQueryAsync<TElement>(string sqlQuery, Dictionary<string, object> parameters);

        Task<DataTable> GetDataTableAsync(string sqlQuery, Dictionary<string, object> parameters);

        Task<string> ExecuteScalarAsync(string sqlQuery, Dictionary<string, object> parameters);

        Task<string> ExecuteScalarAsync(string sqlQuery);

        T GetContext();
        string getConnectString();
        void BeginTransaction(System.Data.IsolationLevel isolationLevel = IsolationLevel.Serializable);
        Task BeginTransactionAsync(System.Data.IsolationLevel isolationLevel = IsolationLevel.Serializable);
        void CommitTransaction();
        void RollBackTransaction();

        Dictionary<string, (int, int, int)> GetAddUpdateDeleteEntryCount();
        /// <summary>
        /// Get instance of dbcontext in a serviceScope identified by type of 'T'.
        /// </summary>
        T GetContextScoped(IServiceScope serviceScope);
        /// <summary>
        /// Execute a wrapper query 'queryFunc' in a serviceScope and return a list of Entity data.
        /// </summary>
        Task<List<TEntity>> GetScopedResultAsync<TEntity>(IServiceProvider serviceProvider, Func<DbSet<TEntity>, Task<List<TEntity>>> queryFunc) where TEntity : class;

        Task<PagedResponse<IEnumerable<TEntity>>> GetPagedReponseAsync<TEntity>(IQueryable<TEntity> queryable, SmartTableParam param) where TEntity : class;
    }
}
