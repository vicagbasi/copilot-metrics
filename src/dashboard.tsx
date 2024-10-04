import { useState } from 'react';

import { CopilotUsageData, copilotUsageData } from './interfaces';
import { UsersComponent } from './components/UsersComponent';
import { LanguagesBreakdown } from './components/LanguagesBreakdown';
import { EditorsBreakdown } from './components/EditorsBreakdown';
import { StatsComponent } from './components/Stats';
import { CopilotChatChart } from './components/CopilotStats';

export const CopilotDashboard: React.FC = () => {
  const [data] = useState<CopilotUsageData>(copilotUsageData);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="text-4xl font-semibold">Overview</h1>
        <h2 className="text-xl text-gray-500 py-1">
          Metrics and insights from up to the past 28 days
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <UsersComponent
          className="flex-1 min-w-full md:min-w-[35%] h-full shadow-lg hover:shadow-xl transition-shadow"
          data={data}
        />

        <StatsComponent
          className="flex-1 min-w-full md:min-w-[64%] shadow-lg hover:shadow-xl transition-shadow"
          data={data}
        />
        <LanguagesBreakdown
          className="flex-1 min-w-full md:min-w-[32%] shadow-lg hover:shadow-xl transition-shadow"
          data={data}
        />

        <EditorsBreakdown
          className="flex-1 min-w-full md:min-w-[42%] shadow-lg hover:shadow-xl transition-shadow"
          data={data}
        />
        <CopilotChatChart
          className="flex-1 min-w-full md:min-w-[56%] shadow-lg hover:shadow-xl transition-shadow"
          data={data}
        />
      </div>
    </>
  );
};
