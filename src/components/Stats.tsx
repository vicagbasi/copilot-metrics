'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CopilotUsageData } from '@/interfaces';

const codeSelectionChartConfig = {
  acceptances: {
    label: 'Acceptances',
    color: 'hsl(var(--chart-1))',
  },
  suggestions: {
    label: 'Suggestions',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function StatsComponent({
  data,
  className,
}: {
  data: CopilotUsageData;
  className?: string;
}) {
  const stats = React.useMemo(() => {
    const totalDays = data.length;
    const totalAcceptances = data.reduce(
      (acc, curr) => acc + curr.total_acceptances_count,
      0
    );
    const totalSuggestions = data.reduce(
      (acc, curr) => acc + curr.total_suggestions_count,
      0
    );

    return {
      avgSuggestionsPerDay: totalSuggestions / totalDays,
      acceptanceRate: (totalAcceptances / totalSuggestions) * 100,
    };
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Copilot Completion Stats</CardTitle>
          <CardDescription>
            Daily Suggestion and Acceptance statistics
          </CardDescription>
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Daily Suggestions
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {Math.ceil(stats.avgSuggestionsPerDay)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Acceptance Rate
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {stats.acceptanceRate.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={codeSelectionChartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />

            <Bar
              dataKey="total_acceptances_count"
              stackId="a"
              fill={codeSelectionChartConfig.acceptances.color}
              name="Acceptances"
            />
            <Bar
              dataKey="total_suggestions_count"
              stackId="a"
              fill={codeSelectionChartConfig.suggestions.color}
              name="Suggestions"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
