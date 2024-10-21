namespace CopilotMetrics.WebApi.Models
{
    public record Team
    {
        public string? name { get; init; }
        public int id { get; init; }
        public string? node_id { get; init; }
        public string? slug { get; init; }
        public string? description { get; init; }
        public string? privacy { get; init; }
        public string? notification_setting { get; init; }
        public string? url { get; init; }
        public string? html_url { get; init; }
        public string? members_url { get; init; }
        public string? repositories_url { get; init; }
        public string? permission { get; init; }
        public string? parent { get; init; }
    }
}
