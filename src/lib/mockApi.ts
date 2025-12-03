import orders from '../mock-data/orders.json';
import invoices from '../mock-data/invoices.json';
import services from '../mock-data/services.json';
import projects from '../mock-data/projects.json';
import users from '../mock-data/users.json';
import tickets from '../mock-data/tickets.json';
import analytics from '../mock-data/analytics.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getOrders: async () => {
    await delay(500);
    return orders;
  },
  getInvoices: async () => {
    await delay(500);
    return invoices;
  },
  getServices: async () => {
    await delay(500);
    return services;
  },
  getProjects: async () => {
    await delay(500);
    return projects;
  },
  getUsers: async () => {
    await delay(500);
    return users;
  },
  getTickets: async () => {
    await delay(500);
    return tickets;
  },
  getAnalytics: async () => {
    await delay(500);
    return analytics;
  },
  // Mutations (simulated)
  createOrder: async (order: any) => {
    await delay(800);
    console.log('Order created:', order);
    return { ...order, id: `ORD-${Date.now()}`, status: 'pending' };
  },
  updateProject: async (id: string, updates: any) => {
    await delay(600);
    console.log('Project updated:', id, updates);
    return { id, ...updates };
  },
  createTicket: async (ticket: any) => {
    await delay(700);
    console.log('Ticket created:', ticket);
    return { ...ticket, id: `TKT-${Date.now()}`, status: 'open', created: new Date().toISOString() };
  },
  inviteUser: async (email: string, role: string) => {
    await delay(600);
    console.log('User invited:', email, role);
    return { id: `user-${Date.now()}`, email, role, status: 'invited' };
  }
};
