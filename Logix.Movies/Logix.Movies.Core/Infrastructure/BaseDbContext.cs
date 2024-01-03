using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Logix.Movies.Core.Wrappers;

namespace Logix.Movies.Core.Infrastructure
{
    public class BaseDbContext : Microsoft.EntityFrameworkCore.DbContext, IApplicationDbContext, IChangedDataContext
    {
        public BaseDbContext(DbContextOptions options) : base(options)
        {
            if (Database != null && !Database.IsInMemory())
            {
                Database.SetCommandTimeout(ApplicationContextOptions.CommandTimeout);
            }
        }

        public BaseDbContext()
        {
            if (Database != null && !Database.IsInMemory())
            {
                Database.SetCommandTimeout(ApplicationContextOptions.CommandTimeout);
            }
        }

        public virtual DbSet<T> Repository<T>() where T : class
        {
            return Set<T>();
        }

        public async Task<int> ExecuteSqlRawAsync(string sql, params object[] parameters)
        {
            return await base.Database.ExecuteSqlRawAsync(sql, parameters);
        }

        /// <summary>
        /// Insert changed fields only for an entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        public async Task<T> AddAsync<T>(T entity, bool isCommit = true) where T : class
        {
            base.Entry(entity).State = EntityState.Added;
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entity;
        }

        /// <summary>
        /// Insert changed fields only for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        public async Task<IReadOnlyList<T>> AddRangeAsync<T>(IReadOnlyList<T> entities, bool isCommit = true) where T : class
        {
            await base.Set<T>().AddRangeAsync(entities);
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entities;
        }

        /// <summary>
        /// Insert changed fields only for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        public async Task<IEnumerable<T>> AddRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class
        {
            await base.Set<T>().AddRangeAsync(entities);
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entities;
        }

        /// <summary>
        /// Update changed fields only for an entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        public async Task<T> UpdateAsync<T>(T entity, bool isCommit = true) where T : class
        {
            base.Entry(entity).State = EntityState.Modified;
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entity;
        }

        /// <summary>
        /// Update changed fields only for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        public async Task<IReadOnlyList<T>> UpdateRangeAsync<T>(IReadOnlyList<T> entities, bool isCommit = true) where T : class
        {
            base.Set<T>().UpdateRange(entities);
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entities;
        }

        /// <summary>
        /// Update changed fields only for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        public async Task<IEnumerable<T>> UpdateRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class
        {
            base.Set<T>().UpdateRange(entities);
            if (isCommit)
            {
                await SaveChangesAsync();
            }
            return entities;
        }

        /// <summary>
        /// Delete hard for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        public async Task HardDeleteRangeAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class
        {
            var queryable = base.Set<T>().Where<T>(predicate).AsQueryable();
            var entities = queryable.ToList();
            if (entities.Any())
            {
                base.RemoveRange(entities);
                if (isCommit)
                {
                    await SaveChangesAsync();
                }
            }
        }

        /// <summary>
        /// Delete hard for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        public async Task HardDeleteRangeAsync<T>(IEnumerable<T> entities, bool isCommit = true) where T : class
        {
            if (entities.Any())
            {
                base.RemoveRange(entities);
                if (isCommit)
                {
                    await SaveChangesAsync();
                }
            }
        }

        /// <summary>
        /// Delete hard for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        public async Task HardDeleteAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class
        {
            var entity = await base.Set<T>().FirstOrDefaultAsync<T>(predicate);

            if (entity != null)
            {
                base.Remove(entity);
                if (isCommit)
                {
                    await SaveChangesAsync();
                }
            }
        }



        /// <summary>
        /// Delete hard for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        public async Task HardDeleteAsync<T>(T entity, bool isCommit = true) where T : class
        {
            if (entity != null)
            {
                base.Remove(entity);
                if (isCommit)
                {
                    await SaveChangesAsync();
                }
            }
        }

        /// <summary>
        /// Delete soft for entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        public async Task DeleteRangeAsync<T>(Expression<Func<T, bool>> predicate, bool isCommit = true) where T : class
        {
            var queryable = base.Set<T>().Where<T>(predicate).AsQueryable();
            var entities = queryable.ToList();
            if (entities.Any())
            {
                base.RemoveRange(entities);
                if (isCommit)
                {
                    await SaveChangesAsync();
                }
            }
        }

        public async Task<IReadOnlyList<T>> GetAllAsync<T>(Expression<Func<T, object>>[] includes) where T : class
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = base.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return await query.ToListAsync();
            }
            return await base.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync<T>(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes) where T : class
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = base.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return await query.Where<T>(predicate).ToListAsync<T>();
            }
            return await base.Set<T>().Where<T>(predicate).ToListAsync();
        }

        public async Task<int> CountAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return await base.Set<T>().Where(predicate).CountAsync();
        }

        public async Task<T> FirstOrDefaultAsync<T>(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes) where T : class
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = base.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return await query.FirstOrDefaultAsync(predicate);
            }
            return await base.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<PagedResponse<IEnumerable<T>>> GetPagedReponseAsync<T>(Expression<Func<T, bool>> predicate, int pageNumber = 1, int pageSize = 50, bool isPaging = false, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includeProperties) where T : class
        {
            if (!isPaging)
            {
                pageNumber = 1;
                pageSize = int.MaxValue;
            }

            IQueryable<T> _resetSet;

            if (includeProperties.Length > 0)
            {
                var query = base.Set<T>().Include(includeProperties.First());
                foreach (var include in includeProperties.Skip(1))
                    query = query.Include(include);
                _resetSet = predicate != null ? query.Where<T>(predicate).AsQueryable()
                                                : query.AsQueryable();
            }
            else
            {
                _resetSet = predicate != null ? base.Set<T>().Where<T>(predicate).AsQueryable()
                                             : base.Set<T>().AsQueryable();
            }


            _resetSet = orderBy(_resetSet);

            var total = _resetSet.Count();

            _resetSet = pageNumber == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            var result = await _resetSet.ToListAsync();

            return new PagedResponse<IEnumerable<T>>(result, pageNumber, pageSize, total);
        }
    }
}
