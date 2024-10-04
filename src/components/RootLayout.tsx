import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div
      className={`container mx-auto px-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
    >
      <header
        className={`flex justify-between items-center py-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
      >
        <h1 className="text-3xl font-semibold">Github Copilot Metrics</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className={`hover:text-blue-500 transition ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/seats"
                className={`hover:text-blue-500 transition ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Seats
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className={`hover:text-blue-500 transition ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mt-4">{children}</main>
    </div>
  );
};
