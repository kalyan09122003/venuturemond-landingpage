// Mock API data for the dashboard

export interface DashboardOverview {
  mrr: number;
  mrrChange: number;
  balanceDue: number;
  activeSubscriptions: number;
  onboardingProgress: number;
  onboardingSteps: OnboardingStep[];
  recentOrders: Order[];
  revenueData: { date: string; value: number }[];
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'complete';
  action?: string;
}

export interface Order {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  date: string;
  items: OrderItem[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  pdfUrl: string;
  taxBreakdown: {
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
  avatar?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
}

export interface Service {
  id: string;
  name: string;
  status: 'active' | 'provisioning' | 'suspended';
  usage: number;
  usageLimit: number;
  renewalDate: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'complete';
  dueDate: string;
  deliverables: string[];
}

// Mock data
export const mockDashboardOverview: DashboardOverview = {
  mrr: 12450,
  mrrChange: 12.5,
  balanceDue: 2340,
  activeSubscriptions: 8,
  onboardingProgress: 60,
  onboardingSteps: [
    { id: '1', title: 'Company Details', description: 'Add your company information', status: 'complete' },
    { id: '2', title: 'Tax Information', description: 'Add GST/VAT details', status: 'complete' },
    { id: '3', title: 'Billing Address', description: 'Set your billing address', status: 'in_progress', action: 'Complete' },
    { id: '4', title: 'Team Setup', description: 'Invite your team members', status: 'pending', action: 'Start' },
    { id: '5', title: 'Payment Method', description: 'Add a payment method', status: 'pending', action: 'Add' },
  ],
  recentOrders: [
    { id: 'ORD-001', name: 'Enterprise Plan', status: 'active', amount: 2499, date: '2024-01-15', items: [] },
    { id: 'ORD-002', name: 'API Access', status: 'pending', amount: 499, date: '2024-01-14', items: [] },
    { id: 'ORD-003', name: 'Support Package', status: 'completed', amount: 199, date: '2024-01-12', items: [] },
  ],
  revenueData: [
    { date: 'Jan', value: 8500 },
    { date: 'Feb', value: 9200 },
    { date: 'Mar', value: 10100 },
    { date: 'Apr', value: 9800 },
    { date: 'May', value: 11500 },
    { date: 'Jun', value: 12450 },
  ],
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    name: 'Enterprise Plan - Annual',
    status: 'active',
    amount: 29988,
    date: '2024-01-15',
    items: [
      { name: 'Enterprise License', quantity: 1, price: 24999 },
      { name: 'Priority Support', quantity: 1, price: 4989 },
    ],
  },
  {
    id: 'ORD-002',
    name: 'API Access - Pro Tier',
    status: 'pending',
    amount: 5988,
    date: '2024-01-14',
    items: [
      { name: 'API Calls (1M)', quantity: 12, price: 499 },
    ],
  },
  {
    id: 'ORD-003',
    name: 'Custom Integration',
    status: 'completed',
    amount: 15000,
    date: '2024-01-12',
    items: [
      { name: 'Integration Setup', quantity: 1, price: 10000 },
      { name: 'Training Sessions', quantity: 5, price: 1000 },
    ],
  },
  {
    id: 'ORD-004',
    name: 'Starter Plan',
    status: 'cancelled',
    amount: 2988,
    date: '2024-01-10',
    items: [
      { name: 'Starter License', quantity: 1, price: 2988 },
    ],
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    orderId: 'ORD-001',
    amount: 35385.24,
    status: 'paid',
    date: '2024-01-15',
    dueDate: '2024-01-30',
    pdfUrl: '/invoices/INV-001.pdf',
    taxBreakdown: {
      subtotal: 29988,
      tax: 5397.24,
      taxRate: 18,
      total: 35385.24,
    },
  },
  {
    id: 'INV-002',
    orderId: 'ORD-002',
    amount: 7065.84,
    status: 'pending',
    date: '2024-01-14',
    dueDate: '2024-01-29',
    pdfUrl: '/invoices/INV-002.pdf',
    taxBreakdown: {
      subtotal: 5988,
      tax: 1077.84,
      taxRate: 18,
      total: 7065.84,
    },
  },
  {
    id: 'INV-003',
    orderId: 'ORD-003',
    amount: 17700,
    status: 'overdue',
    date: '2024-01-01',
    dueDate: '2024-01-16',
    pdfUrl: '/invoices/INV-003.pdf',
    taxBreakdown: {
      subtotal: 15000,
      tax: 2700,
      taxRate: 18,
      total: 17700,
    },
  },
];

export const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', email: 'john@company.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'member', status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'member', status: 'pending' },
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Integration Issue with API',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    messages: [
      { id: '1', sender: 'user', message: 'We are experiencing issues with the API integration.', timestamp: '2024-01-15T10:30:00Z' },
      { id: '2', sender: 'support', message: 'Thank you for reporting. Can you share more details?', timestamp: '2024-01-15T11:00:00Z' },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Billing Question',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-11T16:00:00Z',
    messages: [
      { id: '1', sender: 'user', message: 'Question about my invoice.', timestamp: '2024-01-10T09:00:00Z' },
      { id: '2', sender: 'support', message: 'Happy to help! Which invoice are you referring to?', timestamp: '2024-01-10T10:00:00Z' },
    ],
  },
];

export const mockServices: Service[] = [
  { id: '1', name: 'Enterprise Platform', status: 'active', usage: 75, usageLimit: 100, renewalDate: '2024-12-31' },
  { id: '2', name: 'API Access', status: 'active', usage: 450000, usageLimit: 1000000, renewalDate: '2024-02-15' },
  { id: '3', name: 'Storage Add-on', status: 'provisioning', usage: 0, usageLimit: 500, renewalDate: '2024-02-01' },
];

export const mockProjectMilestones: ProjectMilestone[] = [
  {
    id: '1',
    title: 'Discovery & Planning',
    status: 'complete',
    dueDate: '2024-01-10',
    deliverables: ['Requirements Document', 'Project Timeline', 'Technical Spec'],
  },
  {
    id: '2',
    title: 'Design Phase',
    status: 'in_progress',
    dueDate: '2024-01-25',
    deliverables: ['UI Mockups', 'Component Library', 'Design System'],
  },
  {
    id: '3',
    title: 'Development Sprint 1',
    status: 'pending',
    dueDate: '2024-02-15',
    deliverables: ['Core Features', 'API Integration', 'Testing'],
  },
];

// API simulation functions
export const fetchDashboardOverview = (): Promise<DashboardOverview> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardOverview), 800);
  });
};

export const fetchOrders = (status?: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = status ? mockOrders.filter(o => o.status === status) : mockOrders;
      resolve(filtered);
    }, 600);
  });
};

export const fetchInvoices = (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInvoices), 500);
  });
};

export const inviteTeamMember = (email: string, role: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};

export const createSupportTicket = (subject: string, message: string): Promise<SupportTicket> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `TKT-${Date.now()}`,
        subject,
        status: 'open',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          { id: '1', sender: 'user', message, timestamp: new Date().toISOString() },
        ],
      };
      resolve(newTicket);
    }, 800);
  });
};
