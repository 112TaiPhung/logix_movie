using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Infrastructure;
using Logix.Movies.Core.Services;
using Logix.Movies.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Logix.Movies.Infrastructure
{
    public class ApplicationDbContext : BaseDbContext
    {
        private readonly IAuthenticatedUserService _authenticatedUser;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IAuthenticatedUserService authenticatedUser)
            : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            _authenticatedUser = authenticatedUser;
        }

        #region Table
         
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieAttachment> MovieAttachments { get; set; }
        public DbSet<LikeMovie> LikeMovies { get; set; }
         
        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<ApplicationRole> Roles { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityUserRole<Guid>>(entity =>
            {
                entity.ToTable("UserRoles");
                entity.HasKey(x => new { x.RoleId, x.UserId });
            });

            builder.Entity<IdentityUserClaim<Guid>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<Guid>>(entity =>
            {
                entity.ToTable("UserLogins");
                entity.HasKey(x => new { x.LoginProvider, x.ProviderKey });
            });

            builder.Entity<IdentityRoleClaim<Guid>>(entity =>
            {
                entity.ToTable("RoleClaims");
            });

            builder.Entity<IdentityUserToken<Guid>>(entity =>
            {
                entity.ToTable("UserTokens");
                entity.HasKey(x => new { x.UserId, x.LoginProvider, x.Name });
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableBaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Unchanged:
                        entry.Entity.Created = DateTime.UtcNow;
                        entry.Entity.LastModified = DateTime.UtcNow;
                        entry.Entity.CreatedBy = string.IsNullOrEmpty(entry.Entity.CreatedBy) ? _authenticatedUser?.Email : entry.Entity.CreatedBy;
                        entry.Entity.LastModifiedBy = string.IsNullOrEmpty(entry.Entity.LastModifiedBy) ? _authenticatedUser?.Email : entry.Entity.LastModifiedBy;
                        entry.Entity.IsActive = true;
                        entry.Entity.IsDelete = false;
                        break;

                    case EntityState.Added:
                        entry.Entity.Created = DateTime.UtcNow;
                        entry.Entity.LastModified = DateTime.UtcNow;
                        entry.Entity.CreatedBy = string.IsNullOrEmpty(entry.Entity.CreatedBy) ? _authenticatedUser?.Email : entry.Entity.CreatedBy;
                        entry.Entity.LastModifiedBy = string.IsNullOrEmpty(entry.Entity.LastModifiedBy) ? _authenticatedUser?.Email : entry.Entity.LastModifiedBy;
                        entry.Entity.IsActive = true;
                        entry.Entity.IsDelete = false;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModified = DateTime.UtcNow;
                        entry.Entity.LastModifiedBy = _authenticatedUser?.Email;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}