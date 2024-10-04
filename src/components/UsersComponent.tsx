'use client';

import * as React from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CopilotUsageData } from '@/interfaces';

export const description = 'An interactive area chart showing Copilot usage';

const processData = (data: CopilotUsageData) => {
  return data.map((day) => ({
    date: day.day,
    totalUsers: day.total_active_users + day.total_active_chat_users,
    chatUsers: day.total_active_chat_users,
  }));
};

const chartConfig: ChartConfig = {
  totalUsers: {
    label: 'Total Users', // Updated label
    color: 'hsl(var(--chart-2))', // Switched color
  },
  chatUsers: {
    label: 'Chat Users', // Updated label
    color: 'hsl(var(--chart-1))', // Switched color
  },
} satisfies ChartConfig;

export function UsersComponent({
  data,
  className,
}: {
  data: CopilotUsageData;
  className?: string;
}) {
  const chartData = processData(data);

  const total = React.useMemo(() => {
    const daysCount = chartData.length; // Get the number of days
    return {
      totalUsers:
        daysCount > 0
          ? Math.ceil(
              chartData.reduce((acc, curr) => acc + curr.totalUsers, 0) /
                daysCount,
            )
          : 0, // Average total users rounded up
      chatUsers:
        daysCount > 0
          ? Math.ceil(
              chartData.reduce((acc, curr) => acc + curr.chatUsers, 0) /
                daysCount,
            )
          : 0, // Average chat users rounded up
    };
  }, [chartData]);

  return (
    <div className={className}>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Daily Average Users</CardTitle>
            <CardDescription>
              Average daily user activity for the last 28 days
            </CardDescription>
          </div>
          <div className="flex">
            {(['totalUsers', 'chatUsers'] as const).map((key) => (
              <div
                key={key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                hide={true} // Hide the x-axis
              />
              <YAxis hide={true} /> // Hide the y-axis
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="totalUsers"
                stackId="1"
                stroke={chartConfig.totalUsers.color}
                fill={chartConfig.totalUsers.color}
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="chatUsers"
                stackId="1"
                stroke={chartConfig.chatUsers.color}
                fill={chartConfig.chatUsers.color}
                fillOpacity={0.4}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
