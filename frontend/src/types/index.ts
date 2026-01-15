// TypeScript Types & Interfaces

export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: number;
  fullName: string;
  specialty: string;
  experience: number;
  avatar?: string;
  description?: string;
  rating: number;
  isActive: boolean;
  workSchedule?: any;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: number;
  time: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceId: number;
  service?: Service;
  doctorId?: number;
  doctor?: Doctor;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  todayAppointments: number;
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  totalRevenue: number;
}
