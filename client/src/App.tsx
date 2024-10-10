import { RouterProvider, createRouter } from '@tanstack/react-router';
import './App.css';
import { RootRoute, HomeRoute, SeatsRoute, OverviewRoute } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const routerTree = RootRoute.addChildren([HomeRoute, SeatsRoute, OverviewRoute]);

const router = createRouter({ 
  basepath: import.meta.env.VITE_BASE_PATH || '/',
  routeTree: routerTree });
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
