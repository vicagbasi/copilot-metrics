import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
import { CopilotDashboard } from './dashboard';
import { SeatsComponent } from './components/SeatsComponent'; // Import SeatsComponent
import { RootLayout } from './components/RootLayout';

export const RootRoute = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </RootLayout>
  ),
});

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: CopilotDashboard,
});

export const OverviewRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/overview',
  component: CopilotDashboard,
});



export const SeatsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/seats',
  component: () => <SeatsComponent />,
});
