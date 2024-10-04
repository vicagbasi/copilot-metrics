'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { CopilotUsageData } from '../interfaces';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

interface ChartData {
  name: string;
  value: number;
}

export function EditorsBreakdown({
  data,
  className,
}: {
  data: CopilotUsageData;
  className?: string;
}) {
  const [editorData, setEditorData] = useState<ChartData[]>([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    const editorMap = new Map<string, number>();

    data.forEach(day => {
      day.breakdown.forEach(item => {
        editorMap.set(
          item.editor,
          (editorMap.get(item.editor) || 0) + item.active_users
        );
      });
    });

    const sortedEditors = Array.from(editorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], index) => ({
        name,
        value,
        fill: COLORS[index % COLORS.length],
      }));

    setEditorData(sortedEditors);

    const newChartConfig = sortedEditors.reduce<
      Record<string, { label: string; color: string }>
    >((acc, editor, index) => {
      acc[editor.name] = {
        label: editor.name,
        color: COLORS[index % COLORS.length],
      };
      return acc;
    }, {});

    setChartConfig(newChartConfig);
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Editors Breakdown</CardTitle>
        <CardDescription>Top editors used</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-full">
        <ChartContainer config={chartConfig} className="w-full h-full p-3">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={editorData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              paddingAngle={2}
              label={({ name }) => `${name}`}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
