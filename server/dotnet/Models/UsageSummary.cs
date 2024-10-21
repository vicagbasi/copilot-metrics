    
namespace CopilotMetrics.WebApi.Models
{
    public record UsageSummary
    {
        public List<DailyUsageMetrics>? Days { get; init; }
    }

    public record Breakdown
    {
        public string? language { get; init; }
        public string? editor { get; init; }
        public int suggestions_count { get; init; }
        public int acceptances_count { get; init; }
        public int lines_suggested { get; init; }
        public int lines_accepted { get; init; }
        public int active_users { get; init; }
    }

    public record DailyUsageMetrics
    {
        public string? day { get; init; }
        public int total_suggestions_count { get; init; }
        public int total_acceptances_count { get; init; }
        public int total_lines_suggested { get; init; }
        public int total_lines_accepted { get; init; }
        public int total_active_users { get; init; }
        public int total_chat_acceptances { get; init; }
        public int total_chat_turns { get; init; }
        public int total_active_chat_users { get; init; }
        public List<Breakdown>? breakdown { get; init; }
    }

}
