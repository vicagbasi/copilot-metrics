using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.CopilotMetrics.WebApi.Models
{
    public record UsageSummary
    {
        [Required]
        public required List<DailyUsageMetrics> Days { get; init; }
    }

    public record DailyUsageMetrics
    {
        [JsonPropertyName("day")]
        public string? Day { get; init; }

        [JsonPropertyName("total_suggestions_count")]
        public int TotalSuggestionsCount { get; init; }

        [JsonPropertyName("total_acceptances_count")]
        public int TotalAcceptancesCount { get; init; }

        [JsonPropertyName("total_lines_suggested")]
        public int TotalLinesSuggested { get; init; }

        [JsonPropertyName("total_lines_accepted")]
        public int TotalLinesAccepted { get; init; }

        [JsonPropertyName("total_active_users")]
        public int TotalActiveUsers { get; init; }

        [JsonPropertyName("total_chat_acceptances")]
        public int TotalChatAcceptances { get; init; }

        [JsonPropertyName("total_chat_turns")]
        public int TotalChatTurns { get; init; }

        [JsonPropertyName("total_active_chat_users")]
        public int TotalActiveChatUsers { get; init; }

        [JsonPropertyName("breakdown")]
        public required List<Breakdown> Breakdown { get; init; }
    }

    public record Breakdown
    {
        [JsonPropertyName("language")]
        public required string Language { get; init; }

        [JsonPropertyName("editor")]
        public required string Editor { get; init; }

        [JsonPropertyName("suggestions_count")]
        public int SuggestionsCount { get; init; }

        [JsonPropertyName("acceptances_count")]
        public int AcceptancesCount { get; init; }

        [JsonPropertyName("lines_suggested")]
        public int LinesSuggested { get; init; }

        [JsonPropertyName("lines_accepted")]
        public int LinesAccepted { get; init; }

        [JsonPropertyName("active_users")]
        public int ActiveUsers { get; init; }
    }
}
