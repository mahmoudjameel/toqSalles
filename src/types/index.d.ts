// Type definitions for طوق للتقسيط

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Notification {
  type: 'info' | 'warning' | 'success';
  icon: string;
  message: string;
}

export interface AdminStats {
  activeCustomers: number;
  pendingOrders: number;
  totalRevenue: string;
  averageRating: number;
}
