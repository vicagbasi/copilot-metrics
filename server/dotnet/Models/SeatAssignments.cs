
namespace CopilotMetrics.WebApi.Models
{
    public record SeatAssignments
    {
        public int total_seats { get; init; }
        public List<Seat>? seats { get; init; }
    }

    public record Seat
    {
        public DateTime created_at { get; init; }
        public Assignee? assignee { get; init; }
        public DateTime updated_at { get; init; }
        public DateTime? pending_cancellation_date { get; init; }
        public string? plan_type { get; init; }
        public DateTime? last_activity_at { get; init; }
        public string? last_activity_editor { get; init; }
        public Team? assigning_team { get; init; }
        public Organization? organization { get; init; }
    }

    public record Assignee
    {
        public string? login { get; init; }
        public int id { get; init; }
        public string? node_id { get; init; }
        public string? avatar_url { get; init; }
        public string? gravatar_id { get; init; }
        public string? url { get; init; }
        public string? html_url { get; init; }
        public string? followers_url { get; init; }
        public string? following_url { get; init; }
        public string? gists_url { get; init; }
        public string? starred_url { get; init; }
        public string? subscriptions_url { get; init; }
        public string? organizations_url { get; init; }
        public string? repos_url { get; init; }
        public string? events_url { get; init; }
        public string? received_events_url { get; init; }
        public string? type { get; init; }
        public string? user_view_type { get; init; }
        public bool site_admin { get; init; }
    }

}
