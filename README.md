# Copilot Metrics Dashboard

## Overview

This application is a dashboard for visualizing GitHub Copilot usage metrics. It provides insights into how Copilot is being used across different programming languages, editors, and user activities.

## Features

- Display overall Copilot usage statistics
- Breakdown of usage by programming languages
- Breakdown of usage by code editors
- Visualization of code selection and suggestion statistics
- User activity and seat usage information

## Technology Stack

- React 18
- TypeScript
- Vite for build tooling
- TanStack Router for routing
- TanStack Query for data fetching
- Recharts for data visualization
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Building for Production

To create a production build:

## Linting

To run the linter:

## Project Structure

- `src/`: Contains the main source code
  - `components/`: React components for different parts of the dashboard
  - `interfaces.tsx`: TypeScript interfaces for data structures
  - `App.tsx`: Main application component
  - `main.tsx`: Entry point of the application

## Data

The application processes and visualizes Copilot usage data, including:

- Total suggestions and acceptances
- Lines of code suggested and accepted
- Active users
- Breakdowns by programming language and editor

## Contributing

Contributions are welcome. Please ensure you follow the existing code style and add appropriate tests for new features.
