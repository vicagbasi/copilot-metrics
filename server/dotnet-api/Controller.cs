using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using server.dotnet_api.Models;
using System.Net.Http.Headers;
using dotnet_api.Models;

namespace server.dotnet_api.Controllers
{
    [ApiController]
    [Route("api")]
    public class CopilotUsageController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public CopilotUsageController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _httpClient = CreateGitHubClient();
        }

        private HttpClient CreateGitHubClient()
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.github.com/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
            client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", "2022-11-28");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["GithubAuthToken"]);
            return client;
        }

        private string BuildQueryString(UsageQueryParams queryParams)
        {
            var queryString = new List<string>();

            if (!string.IsNullOrEmpty(queryParams.Since))
                queryString.Add($"since={queryParams.Since}");
            if (!string.IsNullOrEmpty(queryParams.Until))
                queryString.Add($"until={queryParams.Until}");
            if (queryParams.Page.HasValue)
                queryString.Add($"page={queryParams.Page}");
            if (queryParams.PerPage.HasValue)
                queryString.Add($"per_page={queryParams.PerPage}");

            return string.Join("&", queryString);
        }

        [HttpGet("enterprises/{enterprise}/copilot/usage")]
        public async Task<IActionResult> GetCopilotUsageForEnterprise(string enterprise, [FromQuery] UsageQueryParams queryParams)
        {
            var queryString = BuildQueryString(queryParams);
            var response = await _httpClient.GetAsync($"enterprises/{enterprise}/copilot/usage?{queryString}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UsageSummary>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("enterprises/{enterprise}/copilot/team/{teamSlug}/usage")]
        public async Task<IActionResult> GetCopilotUsageForTeam(string enterprise, string teamSlug, [FromQuery] UsageQueryParams queryParams)
        {
            var queryString = BuildQueryString(queryParams);
            var response = await _httpClient.GetAsync($"enterprises/{enterprise}/team/{teamSlug}/copilot/usage?{queryString}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UsageSummary>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("orgs/{org}/copilot/usage")]
        public async Task<IActionResult> GetCopilotUsageForOrg(string org, [FromQuery] UsageQueryParams queryParams)
        {
            var queryString = BuildQueryString(queryParams);
            var response = await _httpClient.GetAsync($"orgs/{org}/copilot/usage?{queryString}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<object>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("orgs/{org}/copilot/team/{teamSlug}/usage")]
        public async Task<IActionResult> GetCopilotUsageForOrgTeam(string org, string teamSlug, [FromQuery] UsageQueryParams queryParams)
        {
            var queryString = BuildQueryString(queryParams);
            var response = await _httpClient.GetAsync($"orgs/{org}/team/{teamSlug}/copilot/usage?{queryString}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UsageSummary>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("enterprises/{enterprise}/copilot/billing/seats")]
        public async Task<IActionResult> GetCopilotSeatsForEnterprise(string enterprise, [FromQuery] int? page = null, [FromQuery] int? per_page = null)
        {
            var queryString = string.Empty;

            if (page.HasValue)
                queryString += $"page={page}&";
            if (per_page.HasValue)
                queryString += $"per_page={per_page}&";

            queryString = queryString.TrimEnd('&');

            var response = await _httpClient.GetAsync($"enterprises/{enterprise}/copilot/billing/seats?{queryString}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<SeatAssignments>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("organizations")]
        public async Task<IActionResult> GetOrganizations()
        {
            var response = await _httpClient.GetAsync("organizations");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<List<Organization>>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }

        [HttpGet("orgs/{org}/teams")]
        public async Task<IActionResult> GetTeamsForOrg(string org)
        {
            var response = await _httpClient.GetAsync($"orgs/{org}/teams");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<List<Team>>(jsonData);
                return Ok(result);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }
    }
}
