namespace CopilotMetrics.WebApi.Models
{
    public record Organization
    {
        public string? login { get; init; }
        public int id { get; init; }
        public string? node_id { get; init; }
        public string? url { get; init; }
        public string? repos_url { get; init; }
        public string? events_url { get; init; }
        public string? hooks_url { get; init; }
        public string? issues_url { get; init; }
        public string? members_url { get; init; }
        public string? public_members_url { get; init; }
        public string? avatar_url { get; init; }
        public string? description { get; init; }
    }
}
