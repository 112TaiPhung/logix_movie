using Logix.Movies.API.Extensions;
using Logix.Movies.API.Services;
using Logix.Movies.Application;
using Logix.Movies.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Minio.AspNetCore;
using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
 
var Configuration = builder.Configuration;
 
builder.Services.AddHttpClient();
builder.Services.AddSingleton<IConfiguration>(Configuration);
builder.Services.AddInfrastructure(Configuration, "");
builder.Services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddScoped<MinioObject>();
#region Serilog
builder.Services.AddSingleton<ILoggerFactory, LoggerFactory>();
//builder.Services.AddSingleton<IConfiguration>(Configuration);
builder.Services.AddSingleton<Serilog.ILogger>(Serilog.Log.Logger);
builder.Services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
#endregion

builder.Services.AddSwaggerExtension();
builder.Services.AddApiVersioningExtension();
builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddMvc()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
  
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
