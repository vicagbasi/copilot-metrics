using System.Net.Http.Headers;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Copilot Metrics API", Version = "v1" });
});
builder.Services.AddControllers();
// Pull in values from appsettings.json
var githubApiUrl = builder.Configuration["GithubApiUrl"] ?? string.Empty;
var githubAuthToken = builder.Configuration["GithubAuthToken"] ?? string.Empty;

builder.Services.AddHttpClient("GitHub", client =>
{
    client.BaseAddress = new Uri(githubApiUrl);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("*/*"));
    client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", "2022-11-28");
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {githubAuthToken}");
    client.DefaultRequestHeaders.Add("User-Agent", "CopilotMetricsAPI");
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
