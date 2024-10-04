import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'; // Import the App component

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> {/* Render the App component */}
  </StrictMode>,
);
