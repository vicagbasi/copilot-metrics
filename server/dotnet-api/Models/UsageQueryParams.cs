
namespace server.dotnet_api.Models
{
    public class UsageQueryParams
    {
        public string? Since { get; set; }
        public string? Until { get; set; }
        public int? Page { get; set; } = 1; // Default value
        public int? PerPage { get; set; } = 28; // Default value
    }
}
