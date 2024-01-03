using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Response;
using Logix.Movies.Core.SmartTable;
using Logix.Movies.Core.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Services
{
    public interface IAppBaseService<TEntity, TPrimaryKey, TCreate, TUpdate, TViewOutput>
        where TCreate : class
        where TPrimaryKey : struct
        where TUpdate : DomainUpdate<TPrimaryKey>
        where TViewOutput : DomainResponse<TPrimaryKey>
    {
        Task<PagedResponse<IEnumerable<TViewOutput>>> GetPaging(SmartTableParam param);

        Task<TViewOutput> GetById(TPrimaryKey id);

        Task<TViewOutput> Create(TCreate input);

        Task<TViewOutput> Update(TUpdate input);

        Task<TViewOutput> ChangeIsActive(TPrimaryKey id, bool isActive);

        Task<bool> Delete(TPrimaryKey id);
    }
}
