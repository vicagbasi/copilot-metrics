/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ENTERPRISE } from '@/apiClient';
import { useQuery } from '@tanstack/react-query';
import { getCopilotSeatsForEnterprise } from '@/apiClient';

export const SeatsComponent = () => {
  const isTestData = true;
  const testData: any[] = [
    {
      login: 'octocat_org',
      githubId: 1,
      team: 'Justice League',
      assignedTime: '2021-08-03T18:00:00-06:00',
      lastActivity: '2021-10-14T00:53:32-06:00',
      editor: 'vscode/1.77.3/copilot/1.86.82',
    },
    {
      login: 'octokitten_org',
      githubId: 1,
      team: 'Justice League',
      assignedTime: '2021-09-23T18:00:00-06:00',
      lastActivity: '2021-10-13T00:53:32-06:00',
      editor: 'vscode/1.77.3/copilot/1.86.82',
    },
  ];

  const {
    data: seatsData = [],
    isLoading: loadingSeats,
    isError: errorSeats,
  } = useQuery({
    queryKey: ['seats'], // Assuming ENTERPRISE is imported or defined in this file
    queryFn: () => getCopilotSeatsForEnterprise(ENTERPRISE), // Fetching seats for the enterprise
    initialData: [], // Set initial data to an empty array
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="text-4xl font-semibold">Seats Overview</h1>
        <h2 className="text-xl text-gray-500 py-1">
          Metrics and insights on assigned seats
        </h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Assigned</CardTitle>
              <CardDescription>Currently assigned seats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Assigned But Never Used</CardTitle>
              <CardDescription>No show seats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>No Activity in the Last 7 days</CardTitle>
              <CardDescription>No use in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All assigned seats</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Login</TableHead>
                  <TableHead>GitHub ID</TableHead>
                  <TableHead>Assigning team</TableHead>
                  <TableHead>Last Activity At</TableHead>
                  <TableHead>Last Activity Editor</TableHead>
                </TableRow>
              </TableHeader>

              {loadingSeats && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}

              {errorSeats && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Error loading seats...
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}

              {seatsData && !isTestData && seatsData.length > 0 && (
                <TableBody>
                  {seatsData.map((item: any, index: number) => (
                    <TableRow key={index} className="text-sm">
                      <TableCell className="py-1">{index + 1}</TableCell>
                      <TableCell className="py-1">{item.login}</TableCell>
                      <TableCell className="py-1">{item.githubId}</TableCell>
                      <TableCell className="py-1">{item.team}</TableCell>
                      <TableCell className="py-1">
                        {new Date(item.lastActivity).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="py-1">{item.editor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}

              {isTestData && (
                <TableBody>
                  {testData.map((item: any, index: number) => (
                    <TableRow key={index} className="text-sm">
                      {' '}
                      <TableCell className="py-1">{index + 1}</TableCell>{' '}
                      <TableCell className="py-1">{item.login}</TableCell>
                      <TableCell className="py-1">{item.githubId}</TableCell>
                      <TableCell className="py-1">{item.team}</TableCell>
                      <TableCell className="py-1">
                        {new Date(item.lastActivity).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="py-1">{item.editor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
