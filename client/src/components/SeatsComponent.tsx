 
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
import { useEffect, useState } from 'react';
import { Seat } from '@/interfaces';

export const SeatsComponent = () => {
  const isTestData = false;
  // const testData: any[] = [];
  const [Last7DaysActivity, setLast7DaysActivity] = useState<number | null>(null);
  const [neverUsedSeats, setNeverUsedSeats] = useState<number | null>(null);

  const {
    data: seatsData = {},
    isLoading: loadingSeats,
    isError: errorSeats,
  } = useQuery({
    queryKey: ['seats'], // Assuming ENTERPRISE is imported or defined in this file
    queryFn: () => getCopilotSeatsForEnterprise(ENTERPRISE), // Fetching seats for the enterprise
    initialData: [], // Set initial data to an empty array
  });

  useEffect(() => {
    // Fetch seats data
    console.log("Seats data", seatsData);
    // Calculate last 7 days activity
    const updateActiveTotal = seatsData.seats.filter(
      (seat: Seat) =>
        new Date(seat.last_activity_at) >=
        new Date(new Date().setDate(new Date().getDate() - 7))
    ).length;
    setLast7DaysActivity(updateActiveTotal);

    // Calculate never used seats
    const updateNeverUsedSeats = seatsData.seats.filter(
      (seat: Seat) => seat.last_activity_at === null || new Date(seat.last_activity_at) < new Date('2024-01-01')
    ).length;   
    setNeverUsedSeats(updateNeverUsedSeats);

  }, [seatsData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="text-4xl font-semibold">Seats Overview</h1>
        <h2 className="text-xl text-gray-500 py-1">
          Metrics and insights on assigned seats
        </h2>
      </div>
      <div className="space-y-4 pb-9">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Assigned</CardTitle>
              <CardDescription>Currently assigned seats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{seatsData.total_seats}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Assigned But Never Used</CardTitle>
              <CardDescription>No show seats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ neverUsedSeats }</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>No Activity in the Last 7 days</CardTitle>
              <CardDescription>No use in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ Last7DaysActivity }</p>
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

              {seatsData.seats && !isTestData && seatsData.seats.length > 0 && (
                <TableBody>
                {seatsData.seats.map((item: Seat, index: number) => (
                  <TableRow key={item.assignee.id} className="text-sm">
                    <TableCell className="py-1">{index + 1}</TableCell>{' '}
                    <TableCell className="py-1">{item.assignee.login}</TableCell>
                    <TableCell className="py-1">{item.assigning_team?.name}</TableCell>
                    <TableCell className="py-1">
                      {new Date(item.last_activity_at).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="py-1">{item.last_activity_editor}</TableCell>
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
