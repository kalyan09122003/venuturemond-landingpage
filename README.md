# Client Dashboard Extension

This project extends the existing client dashboard with comprehensive features including Orders, Invoices, Services, Projects, Team Management, Support, Analytics, and Settings.

## Features

- **Orders & Invoices**: View and filter orders, track status with a timeline, and download mock invoices.
- **Services Catalog**: Browse services, configure plans (seats, storage, add-ons), and checkout.
- **Project Workspace**: Manage projects with a Kanban board, file browser, and deliverable approval flow.
- **Team Management**: Invite team members and manage roles (Admin, Editor, Viewer).
- **Support**: Create and view support tickets with SLA timers and chat interface.
- **Analytics**: View revenue trends, active users, and export data to CSV.
- **Settings**: Manage profile, security (2FA, API keys), and integrations.
- **Mobile Responsive**: Fully responsive layout with mobile sidebar and quick actions.

## Mock Data

The application uses a mock data layer to simulate backend interactions. Data is loaded from JSON files located in `src/mock-data/`.
- `orders.json`
- `invoices.json`
- `services.json`
- `projects.json`
- `users.json`
- `tickets.json`
- `analytics.json`

A `mockApi` utility (`src/lib/mockApi.ts`) handles data fetching and simulated mutations (e.g., creating an order, inviting a user).

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the demo page**:
   Visit [http://localhost:5173/client/demo](http://localhost:5173/client/demo) to see a showcase of all new features.

## Accessibility

- Semantic HTML elements used throughout.
- ARIA labels added for interactive elements.
- Color contrast ratios checked for readability.
- Keyboard navigation supported for key flows.

## Project Structure

- `src/components/ui/`: Reusable UI components (OrderList, KanbanBoard, etc.).
- `src/pages/client/`: Page components for the new client dashboard features.
- `src/mock-data/`: JSON files for mock data.
- `src/lib/mockApi.ts`: Mock API service.
