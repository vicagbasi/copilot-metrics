 
'use client';

import { useEffect, useState } from 'react';
import { CopilotUsageData, copilotUsageData, Organization, Team } from './interfaces';
import { UsersComponent } from './components/UsersComponent';
import { LanguagesBreakdown } from './components/LanguagesBreakdown';
import { EditorsBreakdown } from './components/EditorsBreakdown';
import { StatsComponent } from './components/Stats';
import { CopilotChatChart } from './components/CopilotStats';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

import {
  getCopilotUsageForEnterprise,
  getOrganizations,
  getTeamsForOrg,
} from './apiClient';
import { useQuery } from '@tanstack/react-query';
import { ENTERPRISE } from '@/apiClient';
import { Switch } from './components/ui/switch';

export const CopilotDashboard: React.FC = () => {
  const [testData] = useState<CopilotUsageData>(copilotUsageData);
  const [isTestData, setIsTestData] = useState<boolean>(false); // New state for toggle

  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // State for selected team

  // Fetch organizations with initial data as an empty array
  const {
    data: organizations = [],
    isLoading: loadingOrgs,
    isError: errorOrgs,
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(),
    initialData: [], // Set initial data to an empty array
  });

  // Fetch usage by enterprise on initial load
  const {
    data: usageData = [],
    isLoading: loadingUsage,
    isError: errorUsage,
  } = useQuery({
    queryKey: ['usageByEnterprise'],
    queryFn: () => getCopilotUsageForEnterprise(ENTERPRISE), // Assuming this function is defined in apiClient
    initialData: [], // Set initial data to an empty array
  });

  // Fetch teams for the selected organization with initial data as an empty array
  const {
    data: teams = [],
    isLoading: loadingTeams,
    isError: errorTeams,
  } = useQuery({
    queryKey: ['teams', selectedOrg],
    queryFn: () => getTeamsForOrg(selectedOrg!), // Use non-null assertion since selectedOrg is checked
    enabled: !!selectedOrg, // Only run if an organization is selected
    initialData: [], // Set initial data to an empty array
  });


  // Handle organization selection
  const handleOrgChange = (org: string) => {
    setSelectedOrg(org);
    setSelectedTeam(null); // Reset selected team when organization changes
  };

  // Handle team selection
  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };


  // Log organizations data when it changes
  useEffect(() => {
    console.log('Organizations data:', organizations);
    if(organizations.length > 0) {
      setSelectedOrg(organizations[0].login);
      setSelectedTeam("All");
    }
  }, [organizations]);

  // Log usage data when it changes
  useEffect(() => {
    console.log('Usage data:', usageData);
  }, [usageData]);

  // Log teams data when it changes
  useEffect(() => {
    console.log('Teams data:', teams);
  }, [teams]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="text-4xl font-semibold">Overview</h1>
        <h2 className="text-xl text-gray-500 py-1">
          Metrics and insights from up to the past 28 days
        </h2>
      </div>

      <div className="flex justify-center space-x-8 py-5">
        <Select onValueChange={handleOrgChange} value={selectedOrg || ''}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Select Organization" />
          </SelectTrigger>
          <SelectContent>
            {loadingOrgs && (
              <SelectItem disabled value="loading">
                Loading organizations...
              </SelectItem>
            )}

            {!loadingOrgs && errorOrgs && (
              <SelectItem disabled value="error">
                Error loading organizations...
              </SelectItem>
            )}

            {!loadingOrgs && !errorOrgs && organizations.length > 0 ? (
              organizations.map((org: Organization) => (
                <SelectItem key={org.id} value={org.login}>
                  {org.login}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="no-orgs">
                No organizations available...
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Select onValueChange={handleTeamChange} value={selectedTeam || ''}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {loadingTeams && (
              <SelectItem disabled value="loading">
                Loading teams...
              </SelectItem>
            )}

            {!loadingTeams && errorTeams && (
              <SelectItem disabled value="">
                Error loading teams...
              </SelectItem>
            )}

            {!loadingTeams && !errorTeams && (teams ?? []).length > 0 && (
              <>
                <SelectItem value="All">All Teams</SelectItem>
                {teams.map((team: Team) => (
                  <SelectItem key={team.id} value={team.slug}>
                    {team.name}
                  </SelectItem>
                ))}
              </>
            )}

            {/* {!loadingTeams && !errorTeams && (teams ?? []).length === 0 && (
              <SelectItem disabled value="no-teams">
                No teams available for this organization...
              </SelectItem>
            )} */}
          </SelectContent>
        </Select>
        {/* New Switch for Test Data / Live Data */}
        <div className="flex items-center">
          <label className="mr-2">
            {isTestData ? 'Test Data' : 'Live Data'}
          </label>
          <Switch
            checked={isTestData}
            onCheckedChange={() => setIsTestData(!isTestData)}
          />
        </div>
      </div>

      <div className="text-center text-lg mt-4">
        {loadingUsage && !isTestData && <div>Loading usage data...</div>}
        {errorUsage &&
          !isTestData &&
          (console.log(errorUsage),
          (
            <span className="text-red-500">
              Error loading usage data.. {errorUsage}
            </span>
          ))}
        {!isTestData && usageData.length === 0 && !loadingUsage && (
          <span className="text-gray-500">No usage data available.</span>
        )}
      </div>

      {usageData.length > 0 || isTestData ? (
        <div className="flex flex-wrap gap-4">
          <UsersComponent
            className="flex-1 min-w-full md:min-w-[42%] shadow-lg hover:shadow-xl transition-shadow"
            data={isTestData ? testData : usageData}
          />
          <StatsComponent
            className="flex-1 min-w-full md:min-w-[56%] shadow-lg hover:shadow-xl transition-shadow"
            data={isTestData ? testData : usageData}
          />
          
          <CopilotChatChart
            className="flex-1 min-w-full md:min-w-[100%] shadow-lg hover:shadow-xl transition-shadow"
            data={isTestData ? testData : usageData}
          />

          <LanguagesBreakdown
            className="flex-1 min-w-ful pb-2 md:min-w-[50%] shadow-lg hover:shadow-xl transition-shadow"
            data={isTestData ? testData : usageData}
          />
          <EditorsBreakdown
            className="flex-1 min-w-full pb-2 md:min-w-[48%] shadow-lg hover:shadow-xl transition-shadow"
            data={isTestData ? testData : usageData}
          />
        </div>
      ) : null}
    </>
  );
};
