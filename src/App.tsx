import { RouterProvider, createRouter } from '@tanstack/react-router';
import './App.css';
import { RootRoute, DashboardRoute, SeatsRoute } from './routes';

const routerTree = RootRoute.addChildren([DashboardRoute, SeatsRoute]);
const router = createRouter({ routeTree: routerTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
