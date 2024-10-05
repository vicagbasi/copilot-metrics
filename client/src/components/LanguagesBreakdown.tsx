'use client';

import { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CopilotUsageData } from '@/interfaces';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))',
];

interface ChartData {
  language: string;
  suggestions: number;
}

export function LanguagesBreakdown({
  data,
  className,
}: {
  data: CopilotUsageData;
  className?: string;
}) {
  const [languageData, setLanguageData] = useState<ChartData[]>([]);

  useEffect(() => {
    const languageMap = new Map<string, number>();

    data.forEach(day => {
      day.breakdown.forEach(item => {
        languageMap.set(
          item.language,
          (languageMap.get(item.language) || 0) + item.suggestions_count
        );
      });
    });

    const sortedLanguages = Array.from(languageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([language, suggestions]) => ({ language, suggestions }));

    setLanguageData(sortedLanguages);
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Languages Breakdown</CardTitle>
        <CardDescription>Top programming languages</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-full">
        <ChartContainer className="w-full h-full p-3" config={{}}>
          <RadarChart data={languageData}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="language" />
            <Radar
              name="Suggestions"
              dataKey="suggestions"
              stroke={COLORS[0]}
              fill={COLORS[0]}
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
