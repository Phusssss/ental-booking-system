// TypeScript Types & Interfaces

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export interface CreateAppointmentDto {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceId: number;
  doctorId?: number;
  notes?: string;
}

export interface UpdateAppointmentDto {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  doctorId?: number;
}

export interface CreateServiceDto {
  name: string;
  description?: string;
  price: number;
  duration: number;
  icon?: string;
}

export interface CreateDoctorDto {
  fullName: string;
  specialty: string;
  experience: number;
  avatar?: string;
  description?: string;
  workSchedule?: any;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
