using System.Text.Json.Serialization;

namespace dotnet_api.Models
{
    public record Organization
    {
        [JsonPropertyName("login")]
        public string? Login { get; init; } // The login of the organization

        [JsonPropertyName("id")]
        public int Id { get; init; } // The unique identifier of the organization

        [JsonPropertyName("node_id")]
        public string? NodeId { get; init; } // The node ID of the organization

        [JsonPropertyName("url")]
        public string? Url { get; init; } // The API URL for the organization

        [JsonPropertyName("repos_url")]
        public string? ReposUrl { get; init; } // The URL for the organization's repositories

        [JsonPropertyName("events_url")]
        public string? EventsUrl { get; init; } // The URL for the organization's events

        [JsonPropertyName("hooks_url")]
        public string? HooksUrl { get; init; } // The URL for the organization's hooks

        [JsonPropertyName("issues_url")]
        public string? IssuesUrl { get; init; } // The URL for the organization's issues

        [JsonPropertyName("members_url")]
        public string? MembersUrl { get; init; } // The URL for the organization's members

        [JsonPropertyName("public_members_url")]
        public string? PublicMembersUrl { get; init; } // The URL for the organization's public members

        [JsonPropertyName("avatar_url")]
        public string? AvatarUrl { get; init; } // The URL for the organization's avatar

        [JsonPropertyName("description")]
        public string? Description { get; init; } // The description of the organization (nullable)
    }
}
