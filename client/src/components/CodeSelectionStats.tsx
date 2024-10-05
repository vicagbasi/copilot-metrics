import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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

const chartConfig = {
  desktop: {
    label: 'Acceptances',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Suggestions',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CodeSelectionStats({
  data,
  className,
}: {
  data: CopilotUsageData;
  className?: string;
}) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Code Selection Statistics</CardTitle>
          <CardDescription>
            Code selection acceptances and suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={5}
                axisLine={true}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="total_acceptances_count"
                stackId="a"
                fill="hsl(var(--chart-1))"
                radius={[0, 0, 4, 4]}
                name="Total Acceptances"
              />
              <Bar
                dataKey="total_suggestions_count"
                stackId="a"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
                name="Total Suggestions"
              />
              <ChartLegend
                content={
                  <ChartLegendContent
                    payload={[
                      {
                        value: 'Total Acceptances',
                        color: 'hsl(var(--chart-1))',
                        dataKey: 'total_acceptances_count',
                      },
                      {
                        value: 'Total Suggestions',
                        color: 'hsl(var(--chart-2))',
                        dataKey: 'total_suggestions_count',
                      },
                    ]}
                  />
                }
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
