import { RouterProvider, createRouter } from '@tanstack/react-router';
import './App.css';
import { RootRoute, DashboardRoute, SeatsRoute } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const routerTree = RootRoute.addChildren([DashboardRoute, SeatsRoute]);
const router = createRouter({ routeTree: routerTree });
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
