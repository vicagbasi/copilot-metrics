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
export const DashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: CopilotDashboard,
});

export const LanguageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/language',
  component: function About() {
    return <div className="p-2">Hello from Language!</div>;
  },
});

export const SeatsRoute = createRoute({
  // Add SeatsRoute
  getParentRoute: () => RootRoute,
  path: '/seats',
  component: () => <SeatsComponent />,
});
