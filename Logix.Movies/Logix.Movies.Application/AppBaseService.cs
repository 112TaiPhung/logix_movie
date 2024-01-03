using AutoMapper;
using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Exceptions;
using Logix.Movies.Core.Helpers;
using Logix.Movies.Core.Infrastructure;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using Logix.Movies.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Application
{
    public class AppBaseService<TEntity, TPrimaryKey, TCreate, TUpdate, TViewOutput> : BaseService, IAppBaseService<TEntity, TPrimaryKey, TCreate, TUpdate, TViewOutput>
       where TCreate : class
       where TPrimaryKey : struct
       where TEntity : DomainEntity<TPrimaryKey>
       where TUpdate : DomainUpdate<TPrimaryKey>
       where TViewOutput : DomainResponse<TPrimaryKey>
    {
        public AppBaseService(IMapper mapper,
            IGenericDbContext<ApplicationDbContext> unitOfWork,
            IAuthenticatedUserService authenticatedUserService,
            ICacheService cacheService) : base(unitOfWork, mapper, authenticatedUserService, cacheService)
        {
        }

        public AppBaseService(IMapper mapper,
            IGenericDbContext<ApplicationDbContext> unitOfWork,
            IAuthenticatedUserService authenticatedUserService) : base(unitOfWork, mapper, authenticatedUserService)
        {
        }

        public virtual async Task<PagedResponse<IEnumerable<TViewOutput>>> GetPaging(SmartTableParam param)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var queryable = context.Repository<TEntity>().AsQueryable();
                queryable = queryable.Where(e => !e.IsDelete);

                var result = await _unitOfWork.GetPagedReponseAsync(queryable, param);
                var response = mapper.Map<IEnumerable<TViewOutput>>(result.Data);
                var gmt = _authenticatedUserService.Gmt;
                foreach (var item in response)
                {
                    item.Created = item.Created.ToLocal(gmt);
                    item.LastModified = item.LastModified.ToLocal(gmt);
                }
                return new PagedResponse<IEnumerable<TViewOutput>>(response, result.PageNumber, result.PageSize, result.RowCount);
            }
        }
         
        public virtual async Task<TViewOutput> GetById(TPrimaryKey id)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var entity = await context.FirstOrDefaultAsync<TEntity>(e => e.Id.Equals(id) && !e.IsDelete);

                if (entity == null)
                {
                    throw new ApiException("Id không hợp lệ.");
                }

                return mapper.Map<TViewOutput>(entity);
            }
        }

        public virtual async Task<TViewOutput> Create(TCreate input)
        {
            using (var context = _unitOfWork.GetContext())
            {
                await CheckDataInsert(input, context);
                var entity = MapToEntity(input);

                await context.AddAsync(entity);

                return mapper.Map<TViewOutput>(entity);
            }
        }

        public virtual async Task<TViewOutput> Update(TUpdate input)
        {
            using (var context = _unitOfWork.GetContext())
            {
                await CheckDataUpdate(input, context);
                var entity = await context.FirstOrDefaultAsync<TEntity>(e => e.Id.Equals(input.Id));
                if (entity == null)
                {
                    throw new ApiException("Id không hợp lệ.");
                }
                entity = AutoMapperHelper.Update(input, entity);
                await context.UpdateAsync(entity);
                return mapper.Map<TViewOutput>(entity); ;
            }
        }

        public virtual async Task<TViewOutput> ChangeIsActive(TPrimaryKey id, bool isActive)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var entity = await context.FirstOrDefaultAsync<TEntity>(e => e.Id.Equals(id));

                if (entity == null)
                {
                    throw new ApiException("Id không hợp lệ.");
                }

                if (isActive != entity.IsActive)
                {
                    entity.IsActive = isActive;
                    await context.UpdateAsync(entity);
                }

                return mapper.Map<TViewOutput>(entity);
            }
        }

        public virtual async Task<bool> Delete(TPrimaryKey id)
        {
            using (var context = _unitOfWork.GetContext())
            {
                await CheckDataDelete(id, context);
                var entity = await context.FirstOrDefaultAsync<TEntity>(e => e.Id.Equals(id));

                if (entity == null)
                {
                    throw new ApiException("Id không hợp lệ.");
                }

                entity.IsDelete = true;
                await context.UpdateAsync(entity);

                return true;
            }
        }

        public virtual async Task CheckDataDelete(TPrimaryKey id, ApplicationDbContext context)
        {
        }

        public virtual TEntity MapToEntity(object input)
        {
            return mapper.Map<TEntity>(input);
        }

        public virtual async Task CheckDataInsert(TCreate input, ApplicationDbContext context)
        {

        }

        public virtual async Task CheckDataUpdate(TUpdate input, ApplicationDbContext context)
        {

        }
    }
}
