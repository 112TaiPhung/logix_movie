using AutoMapper;
using Logix.Movies.Core.Infrastructure;
using Logix.Movies.Core.Services;
using Logix.Movies.Infrastructure;

namespace Logix.Movies.Application
{
    public class BaseService : ApplicationDisposable

    {
        private bool disposed = false;
        protected readonly IMapper mapper;
        protected readonly IGenericDbContext<ApplicationDbContext> _unitOfWork;
        protected readonly IAuthenticatedUserService _authenticatedUserService;
        protected readonly ICacheService _cacheService;
        protected BaseService(
            IGenericDbContext<ApplicationDbContext> unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        protected BaseService(
            IGenericDbContext<ApplicationDbContext> unitOfWork,
            IMapper mapper,
            IAuthenticatedUserService authenticatedUserService)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
            _authenticatedUserService = authenticatedUserService;
        }

        protected BaseService(
            IGenericDbContext<ApplicationDbContext> unitOfWork,
            IMapper mapper,
            IAuthenticatedUserService authenticatedUserService,
            ICacheService cacheService)
        {
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
            _authenticatedUserService = authenticatedUserService;
            _cacheService = cacheService;
        }

        // Protected implementation of Dispose pattern.
        protected override void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
                //
                _unitOfWork?.Dispose();
                _unitOfWork?.Dispose();
            }

            // Free any unmanaged objects here.
            //

            disposed = true;
            // Call base class implementation.
            base.Dispose(disposing);
        }
    }
}