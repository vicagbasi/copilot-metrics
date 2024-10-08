using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.dotnet_api.Models
{
    public record SeatAssignments
    {
        [Required]
        [JsonPropertyName("total_seats")]
        public required int TotalSeats { get; init; }

        [Required]
        [JsonPropertyName("seats")]
        public required List<Seat> Seats { get; init; }
    }

    public record Seat
    {
        [JsonPropertyName("created_at")]
        public required DateTime CreatedAt { get; init; }

        [JsonPropertyName("updated_at")]
        public required DateTime UpdatedAt { get; init; }

        [JsonPropertyName("pending_cancellation_date")]
        public DateTime? PendingCancellationDate { get; init; }

        [JsonPropertyName("last_activity_at")]
        public required DateTime LastActivityAt { get; init; }

        [JsonPropertyName("last_activity_editor")]
        public required string LastActivityEditor { get; init; }

        [JsonPropertyName("assignee")]
        public required Assignee Assignee { get; init; }

        [JsonPropertyName("assigning_team")]
        public required Team AssigningTeam { get; init; }
    }

    public record Assignee
    {
        [JsonPropertyName("login")]
        public required string Login { get; init; }

        [JsonPropertyName("id")]
        public required int Id { get; init; }

        [JsonPropertyName("node_id")]
        public required string NodeId { get; init; }

        [JsonPropertyName("avatar_url")]
        public required string AvatarUrl { get; init; }

        [JsonPropertyName("gravatar_id")]
        public required string GravatarId { get; init; }

        [JsonPropertyName("url")]
        public required string Url { get; init; }

        [JsonPropertyName("html_url")]
        public required string HtmlUrl { get; init; }

        [JsonPropertyName("followers_url")]
        public required string FollowersUrl { get; init; }

        [JsonPropertyName("following_url")]
        public required string FollowingUrl { get; init; }

        [JsonPropertyName("gists_url")]
        public required string GistsUrl { get; init; }

        [JsonPropertyName("starred_url")]
        public required string StarredUrl { get; init; }

        [JsonPropertyName("subscriptions_url")]
        public required string SubscriptionsUrl { get; init; }

        [JsonPropertyName("organizations_url")]
        public required string OrganizationsUrl { get; init; }

        [JsonPropertyName("repos_url")]
        public required string ReposUrl { get; init; }

        [JsonPropertyName("events_url")]
        public required string EventsUrl { get; init; }

        [JsonPropertyName("received_events_url")]
        public required string ReceivedEventsUrl { get; init; }

        [JsonPropertyName("type")]
        public required string Type { get; init; }

        [JsonPropertyName("site_admin")]
        public required bool SiteAdmin { get; init; }
    }

}
