import { Link } from '@tanstack/react-router';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto px-4 bg-white text-gray-800">
      <header className="flex justify-between items-center py-6 border-b border-gray-300">
        <h1 className="text-3xl font-semibold">Github Copilot Metrics</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/overview"
                className="hover:text-blue-500 transition text-gray-600"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/seats"
                className="hover:text-blue-500 transition text-gray-600"
              >
                Seats
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mt-4">{children}</main>
    </div>
  );
};
