
namespace CopilotMetrics.WebApi.Models
{
    public class UsageQueryParams
    {
        public string? Since { get; set; }
        public string? Until { get; set; }
        public int? Page { get; set; } // Default value
        public int? PerPage { get; set; } // Default value
    }
}
