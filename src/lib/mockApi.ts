import ordersData from '../mock-data/orders.json';
import invoices from '../mock-data/invoices.json';
import services from '../mock-data/services.json';
import projects from '../mock-data/projects.json';
import users from '../mock-data/users.json';
import tickets from '../mock-data/tickets.json';
import analytics from '../mock-data/analytics.json';
import cartData from '../mock-data/cart.json';
import overviewData from '../mock-data/overview.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory state
let orders = [...ordersData];
let cart = { ...cartData };
let overview = { ...overviewData };

export const mockApi = {
  // Overview
  getOverviewData: async () => {
    await delay(500);
    return overview;
  },
  getKpis: async () => {
    await delay(300);
    return overview.kpis;
  },
  markNotificationRead: async (id: string) => {
    await delay(200);
    if (id === 'all') {
      overview.notifications = overview.notifications.map((n: any) => ({ ...n, read: true }));
    } else {
      overview.notifications = overview.notifications.map((n: any) =>
        n.id === id ? { ...n, read: true } : n
      );
    }
    return overview.notifications;
  },
  getPendingActions: async () => {
    await delay(300);
    return overview.pendingActions;
  },
  downloadMockCsv: async (data: any[], filename: string) => {
    await delay(800); // Simulate generation time
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  },
  // Cart
  getCart: async () => {
    await delay(300);
    return mockApi.calculateTotals(cart);
  },
  updateCart: async (newCart: any) => {
    await delay(300);
    cart = mockApi.calculateTotals(newCart);
    return cart;
  },
  removeItem: async (itemId: string) => {
    await delay(300);
    const newItems = cart.items.filter((item: any) => item.id !== itemId);
    cart = mockApi.calculateTotals({ ...cart, items: newItems });
    return cart;
  },
  applyCoupon: async (code: string) => {
    await delay(500);
    if (code === 'WELCOME10') {
      cart = mockApi.calculateTotals({ ...cart, coupon: { code: 'WELCOME10', discount_percent: 10 } });
      return { success: true, message: 'Coupon applied! -10%', cart };
    }
    return { success: false, message: 'Invalid coupon' };
  },
  calculateTotals: (cartData: any) => {
    if (!cartData.items) return cartData;

    let subtotal = 0;
    cartData.items.forEach((item: any) => {
      const itemBase = item.price_per_unit * item.quantity;
      const addonsTotal = item.add_ons?.reduce((sum: number, addon: any) => {
        return sum + (addon.enabled ? addon.price : 0);
      }, 0) || 0;
      // Assuming add-ons are per item quantity? Or flat? 
      // Usually add-ons scale with quantity or seats. 
      // Let's assume add-ons are flat fee per item unit for now based on previous simple logic, 
      // but "seats" suggests per-seat pricing. 
      // The prompt says "Price Must Update Dynamically... Changes in Quantity, Seats, Add-ons".
      // Let's assume: (Base Price + Addons) * Quantity. 
      // And if seats > 1, maybe base price is per seat? 
      // "price_per_unit" suggests per unit (which might be a license). 
      // "seats" might be a multiplier if the plan is per-seat.
      // Let's stick to a simple formula: (Price + Enabled Addons) * Quantity.
      // If seats affect price, it should be explicit. 
      // Let's assume Price is per seat if seats are involved? 
      // Re-reading: "Seat selector... Price recalculates in real-time". 
      // So likely Price = (Base Price * Seats * Quantity) + (Addons * Quantity).
      // Or maybe Addons are also per seat?
      // Let's go with: Item Total = (Price_Per_Unit * Seats + Addons_Total) * Quantity.

      const itemTotal = (item.price_per_unit * item.seats + addonsTotal) * item.quantity;
      subtotal += itemTotal;
    });

    const discountAmount = cartData.coupon ? (subtotal * (cartData.coupon.discount_percent / 100)) : 0;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (cartData.tax_percent / 100);
    const total = taxableAmount + taxAmount;

    return {
      ...cartData,
      totals: {
        subtotal,
        discount: discountAmount,
        tax: taxAmount,
        total
      }
    };
  },

  // Orders
  getOrders: async () => {
    await delay(500);
    return orders;
  },
  createOrder: async (orderData: any) => {
    await delay(1500); // Simulate processing
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'pending', // Initial status
      contractSigned: false,
      ...orderData
    };
    orders.unshift(newOrder);

    // Clear cart after order creation
    cart = { ...cart, items: [], coupon: null };

    return newOrder;
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    await delay(500);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      orders[orderIndex] = { ...orders[orderIndex], status };
      return orders[orderIndex];
    }
    return null;
  },
  signContract: async (orderId: string) => {
    await delay(1000);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      orders[orderIndex] = { ...orders[orderIndex], contractSigned: true, status: 'provisioning' };
      return orders[orderIndex];
    }
    return null;
  },

  // Other Data
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

  // Other Mutations
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
