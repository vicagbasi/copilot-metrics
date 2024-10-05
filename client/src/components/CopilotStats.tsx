'use client';

import { Line, LineChart, XAxis } from 'recharts';

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

interface CopilotUsageData {
  day: string;
  total_chat_turns: number;
  total_chat_acceptances: number;
}

const chartConfig = {
  turns: {
    label: 'Chat Turns',
    color: 'hsl(var(--chart-1))',
  },
  acceptances: {
    label: 'Chat Acceptances',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CopilotChatChart({
  data,
  className,
}: {
  data: CopilotUsageData[];
  className?: string;
}) {
  const chartData = data.map(item => ({
    day: new Date(item.day).toLocaleDateString(),
    turns: item.total_chat_turns,
    acceptances: item.total_chat_acceptances,
  }));

  const totalAcceptances = data.reduce(
    (sum, item) => sum + item.total_chat_acceptances,
    0
  );
  const totalTurns = data.reduce((sum, item) => sum + item.total_chat_turns, 0);
  const acceptanceRate =
    totalTurns > 0 ? ((totalAcceptances / totalTurns) * 100).toFixed(2) : 0;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Copilot Chat Usage</CardTitle>
          <CardDescription>
            Chat turns and acceptances over time
          </CardDescription>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end">
          <div className="flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Daily Messages
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {Math.ceil(totalTurns / data.length)}{' '}
              {/* Updated to reflect daily average rounded up */}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Acceptance Rate
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {acceptanceRate}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="day"
              tickFormatter={value =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="turns"
              stroke="var(--color-turns)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="acceptances"
              stroke="var(--color-acceptances)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
