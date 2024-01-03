using AutoMapper;
using Logix.Movies.Contract.Accounts;
using Logix.Movies.Contract.Accounts.Dtos;
using Logix.Movies.Core.Domain;
using Logix.Movies.Core.Exceptions;
using Logix.Movies.Core.Helpers;
using Logix.Movies.Core.Infrastructure;
using Logix.Movies.Core.Services;
using Logix.Movies.Core.Wrappers;
using Logix.Movies.Domain.Entities;
using Logix.Movies.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Application.Accounts
{
    public class AccountService : BaseService, IAccountService
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JWTSettings _jwtSettings;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public AccountService(UserManager<ApplicationUser> userManager,
           IOptions<JWTSettings> jwtSettings,
           SignInManager<ApplicationUser> signInManager,
           IAuthenticatedUserService authenticatedUserService,
           IMapper mapper,
            IGenericDbContext<ApplicationDbContext> unitOfWork) : base(unitOfWork, mapper)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings.Value;
            _signInManager = signInManager;
            _authenticatedUserService = authenticatedUserService;
        }

        public async Task<Response<AuthenticationDto>> AuthenticateAsync(AuthenticationRequestDto request, string ipAddress, IConfiguration configuration)
        {
            using (var context = _unitOfWork.GetContext())
            {
                var user = await context.FirstOrDefaultAsync<ApplicationUser>(e => e.Email == request.Email || e.UserName == request.Email);
                //var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    throw new ApiException($"Invalid username or password");

                var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, lockoutOnFailure: false);
                 
                if (!result.Succeeded)
                {
                    throw new ApiException($"Invalid username or password");
                }

                var rolesList = await _userManager.GetRolesAsync(user);
                AuthenticationDto response = new AuthenticationDto();
                response.Id = user.Id;
                response.DeviceId = request.DeviceId;
                response.Email = user.Email;
                response.UserName = user.UserName;
                response.FullName = user.FullName;
                response.LockoutEnabled = user.LockoutEnabled;
                response.LockoutEnd = user.LockoutEnd.GetValueOrDefault();
                response.Roles = rolesList;
                response.IsVerified = user.EmailConfirmed;
                 
                JwtSecurityToken jwtSecurityToken = await GenerateJWToken(user, rolesList, request.DeviceId, context);
                response.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                var refreshToken = GenerateRefreshToken(ipAddress);
                response.RefreshToken = refreshToken.Token;
                return new Response<AuthenticationDto>(response, $"successfully");
            }
        }

        public async Task<Response<Guid>> RegisterAsync(RegisterAccountDto request, string origin)
        {
            using (var context = _unitOfWork.GetContext())
            {
                await ValidateCreateUser(request, context);
                var user = new ApplicationUser
                {
                    Email = request.Email,
                    UserName = request.UserName,
                }; 

                user.EmailConfirmed = true;
                user.PhoneNumberConfirmed = true;

                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new Response<Guid>(user.Id, message: $"Registration account successfully.");
                }
                else
                {
                    throw new ApiException($"{result.Errors}");
                }
            }
        }

        private async Task<bool> ValidateCreateUser(RegisterAccountDto request, ApplicationDbContext context)
        {
            var user = await context.Repository<ApplicationUser>().FirstOrDefaultAsync(e => e.Email == request.Email || e.UserName == request.UserName);
            if (user != null)
            {
                if (user.Email == request.Email)
                {
                    throw new ApiException($"Email '{request.Email}'existed.");
                }
                if (user.UserName == request.UserName)
                {
                    throw new ApiException($"UserName '{request.UserName}' existed.");
                }
            } 
            return true;
        }

        private async Task<JwtSecurityToken> GenerateJWToken(ApplicationUser user, IList<string> roles, string deviceId, ApplicationDbContext context)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);

            var roleClaims = new List<Claim>();
             
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }
             
            string ipAddress = IpHelper.GetIpAddress();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id.ToString()),
                new Claim("ip", ipAddress),
                new Claim("deviceId", deviceId)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }

        private RefreshTokenDto GenerateRefreshToken(string ipAddress)
        {
            return new RefreshTokenDto
            {
                Token = RandomTokenString(),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }

        private string RandomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }
    }
}
