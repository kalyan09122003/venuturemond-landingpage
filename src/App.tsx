import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Index from "./pages/Index"; // Landing Page
import Catalog from "./pages/Catalog"; // Public Service Catalog
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

// Dashboard
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Orders from "./pages/dashboard/Orders";
import OrderDetail from "./pages/dashboard/OrderDetail";
import Invoices from "./pages/dashboard/Invoices";
import Services from "./pages/dashboard/Services";
import Team from "./pages/dashboard/Team";
import Support from "./pages/dashboard/Support";
import Settings from "./pages/dashboard/Settings";

// Client Pages (New)
import ClientOverview from "./pages/client/Overview";
import ClientOrders from "./pages/client/Orders";
import ClientInvoices from "./pages/client/Invoices";
import ClientServices from "./pages/client/Services";
import ClientCheckout from "./pages/client/Checkout";
import ClientCart from "./pages/client/Cart";
import ClientContract from "./pages/client/Contract";
import ClientOrderConfirmation from "./pages/client/OrderConfirmation";
import ClientDemoCart from "./pages/client/demo/Cart";
import ClientProjects from "./pages/client/ProjectList";
import { ProjectShell } from "./pages/client/project/ProjectShell";
import ProjectTasks from "./pages/client/project/ProjectTasks";
import ProjectFiles from "./pages/client/project/ProjectFiles";
import ProjectDeliverables from "./pages/client/project/ProjectDeliverables";
import ProjectRoadmap from "./pages/client/project/ProjectRoadmap";
import ProjectMeetings from "./pages/client/project/ProjectMeetings";
import ProjectBudget from "./pages/client/project/ProjectBudget";
import ProjectTeam from "./pages/client/project/ProjectTeam";
import { mockProjectApi } from "./lib/mockProjectApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Wrapper to fetch project data for the shell
const ClientProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      mockProjectApi.getProject(projectId).then(setProject);
    }
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <ProjectShell project={project}>
      <Outlet />
    </ProjectShell>
  );
};

import ClientTeam from "./pages/client/Team";
import ClientSupport from "./pages/client/Support";
import ClientAnalytics from "./pages/client/Analytics";
import ClientSettings from "./pages/client/Settings";
import ClientDemo from "./pages/client/Demo";

const queryClient = new QueryClient();

const Logout = () => {
  localStorage.removeItem("isAuthenticated");
  return <Navigate to="/login" replace />;
};

// Simple mock protection
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="VentureMond-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Logout Route: Clears auth and redirects */}
            <Route path="/logout" element={<Logout />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:orderId" element={<OrderDetail />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="services" element={<Services />} />
                <Route path="team" element={<Team />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Client Routes (New) */}
              <Route path="/client" element={<DashboardLayout />}>
                <Route index element={<ClientOverview />} />
                <Route path="cart" element={<ClientCart />} />
                <Route path="checkout" element={<ClientCheckout />} />
                <Route path="contract" element={<ClientContract />} />
                <Route path="order-confirmation" element={<ClientOrderConfirmation />} />
                <Route path="demo/cart" element={<ClientDemoCart />} />
                <Route path="orders" element={<ClientOrders />} />
                <Route path="invoices" element={<ClientInvoices />} />
                <Route path="services" element={<ClientServices />} />
                <Route path="projects" element={<ClientProjects />} />
                <Route path="projects/:projectId" element={<ClientProjectDetail />}>
                  <Route index element={<Navigate to="tasks" replace />} />
                  <Route path="tasks" element={<ProjectTasks />} />
                  <Route path="files" element={<ProjectFiles />} />
                  <Route path="deliverables" element={<ProjectDeliverables />} />
                  <Route path="roadmap" element={<ProjectRoadmap />} />
                  <Route path="meetings" element={<ProjectMeetings />} />
                  <Route path="budget" element={<ProjectBudget />} />
                  <Route path="team" element={<ProjectTeam />} />
                </Route>
                <Route path="team" element={<ClientTeam />} />
                <Route path="support" element={<ClientSupport />} />
                <Route path="analytics" element={<ClientAnalytics />} />
                <Route path="settings" element={<ClientSettings />} />
                <Route path="demo" element={<ClientDemo />} />
              </Route>
            </Route>

            {/* 404 - Redirect to Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;