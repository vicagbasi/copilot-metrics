using System.Text.Json.Serialization;

namespace server.dotnet_api.Models
{
    public record Team
    {
        [JsonPropertyName("id")]
        public int Id { get; init; } // The unique identifier of the team

        [JsonPropertyName("node_id")]
        public string? NodeId { get; init; } // The node ID of the team

        [JsonPropertyName("url")]
        public string? Url { get; init; } // The API URL for the team

        [JsonPropertyName("html_url")]
        public string? HtmlUrl { get; init; } // The HTML URL for the team

        [JsonPropertyName("name")]
        public string? Name { get; init; } // The name of the team

        [JsonPropertyName("slug")]
        public string? Slug { get; init; } // The slug of the team

        [JsonPropertyName("description")]
        public string? Description { get; init; } // The description of the team

        [JsonPropertyName("privacy")]
        public string? Privacy { get; init; } // The privacy setting of the team

        [JsonPropertyName("notification_setting")]
        public string? NotificationSetting { get; init; } // The notification setting of the team

        [JsonPropertyName("permission")]
        public string? Permission { get; init; } // The permission level of the team

        [JsonPropertyName("members_url")]
        public string? MembersUrl { get; init; } // The URL for the team's members

        [JsonPropertyName("repositories_url")]
        public string? RepositoriesUrl { get; init; } // The URL for the team's repositories

        [JsonPropertyName("parent")]
        public object? Parent { get; init; } // The parent team, if any (nullable)
    }
}
