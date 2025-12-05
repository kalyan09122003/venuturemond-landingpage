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

## Client Cart & Checkout Flow (New)
A complete Cart → Checkout → Contract → Order flow has been implemented using mock data.

### Cart Features
- **Multiple Items**: Support for multiple services in the cart.
- **Editable Items**: Update quantity, seats, and toggle add-ons.
- **Coupon System**: Apply `WELCOME10` for a 10% discount.
- **Tax Breakdown**: Hover over the tax amount to see details.
- **Responsive Design**: Optimized for mobile and desktop.

### Pages Added
- `/client/cart`: Shopping cart with item management and coupon support.
- `/client/checkout`: Checkout page with billing form, payment method selector, and contract agreement.
- `/client/contract`: Contract signing simulation.
- `/client/order-confirmation`: Order confirmation with status timeline.
- `/client/demo/cart`: Helper route to reset and preload the cart for testing.

### How to Test
1.  Navigate to `/client/demo/cart` to load mock items into the cart.
2.  You will be redirected to `/client/cart`.
3.  **Cart Page**:
    - Adjust quantities and seats.
    - Toggle add-ons.
    - Apply coupon `WELCOME10`.
    - Remove an item (confirmation modal).
4.  Proceed to Checkout.
5.  Fill in billing details (mock data works).
6.  Select a payment method.
7.  Agree to terms and click "Confirm & Pay".
8.  Sign the contract on the next page.
9.  View the order confirmation and timeline.

### Mock API
The flow uses `src/lib/mockApi.ts` which simulates backend delays and state changes in memory. Data is reset on page reload unless persisted (currently in-memory only for orders, cart uses local state in components but mockApi for operations).

## Client Dashboard Overview (New)
A comprehensive Overview page has been added as the landing page for the client dashboard.

### Features
- **Status Banner**: Real-time instance health check.
- **Quick Actions**: One-click access to common tasks (New Project, Buy Service, etc.).
- **KPI Cards**: Key metrics with drilldown links.
- **Revenue Chart**: Interactive 6-month revenue trend with CSV export.
- **Onboarding Progress**: Checklist for account setup.
- **Recent Orders**: Snapshot of latest orders.
- **Activity Feed**: Real-time feed of account activities.
- **Notifications**: Dropdown with unread badge and "mark as read" functionality.

### How to Test
1.  Navigate to `/client` (or log in and go to Dashboard).
2.  **Overview Page**:
    - Verify all sections load with mock data.
    - Click "Export CSV" on the Revenue Chart.
    - Interact with the Onboarding checklist buttons.
    - Click "View all" on Recent Orders to go to the Orders page.
    - Click the Bell icon to see notifications and mark them as read.
    - Use the Search bar (visual only).
