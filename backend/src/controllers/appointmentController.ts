import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto, UpdateAppointmentDto, ApiResponse } from '../types';

const prisma = new PrismaClient();

// Tạo lịch hẹn mới (Public)
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const data: CreateAppointmentDto = req.body;

    // Validate
    if (!data.customerName || !data.customerPhone || !data.appointmentDate || !data.appointmentTime || !data.serviceId) {
      return res.status(400).json({
        success: false,
        error: 'Thiếu thông tin bắt buộc',
      } as ApiResponse);
    }

    // Kiểm tra trùng lịch (cùng ngày, giờ, bác sĩ)
    if (data.doctorId) {
      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          appointmentDate: new Date(data.appointmentDate),
          appointmentTime: data.appointmentTime,
          doctorId: data.doctorId,
          status: {
            in: ['pending', 'confirmed'],
          },
        },
      });

      if (existingAppointment) {
        return res.status(400).json({
          success: false,
          error: 'Khung giờ này đã có người đặt. Vui lòng chọn giờ khác.',
        } as ApiResponse);
      }
    }

    // Tạo appointment
    const appointment = await prisma.appointment.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        appointmentDate: new Date(data.appointmentDate),
        appointmentTime: data.appointmentTime,
        serviceId: data.serviceId,
        doctorId: data.doctorId,
        notes: data.notes,
        status: 'pending',
      },
      include: {
        service: true,
        doctor: true,
      },
    });

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm.',
    } as ApiResponse);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Lấy danh sách lịch hẹn (Admin)
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { status, date, page = '1', limit = '20' } = req.query;

    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (date) {
      const targetDate = new Date(date as string);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      where.appointmentDate = {
        gte: targetDate,
        lt: nextDay,
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          service: true,
          doctor: true,
        },
        orderBy: [
          { appointmentDate: 'asc' },
          { appointmentTime: 'asc' },
        ],
        skip,
        take: Number(limit),
      }),
      prisma.appointment.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    } as ApiResponse);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Lấy chi tiết lịch hẹn
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: {
        service: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Không tìm thấy lịch hẹn',
      } as ApiResponse);
    }

    res.json({
      success: true,
      data: appointment,
    } as ApiResponse);
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Cập nhật lịch hẹn (Admin)
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateAppointmentDto = req.body;

    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data,
      include: {
        service: true,
        doctor: true,
      },
    });

    res.json({
      success: true,
      data: appointment,
      message: 'Cập nhật lịch hẹn thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Xóa lịch hẹn (Admin)
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: 'Xóa lịch hẹn thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Dashboard stats (Admin)
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todayAppointments,
      pendingCount,
      confirmedCount,
      completedCount,
      totalRevenue,
    ] = await Promise.all([
      prisma.appointment.count({
        where: {
          appointmentDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      prisma.appointment.count({
        where: { status: 'pending' },
      }),
      prisma.appointment.count({
        where: { status: 'confirmed' },
      }),
      prisma.appointment.count({
        where: { status: 'completed' },
      }),
      prisma.appointment.findMany({
        where: { status: 'completed' },
        include: { service: true },
      }),
    ]);

    const revenue = totalRevenue.reduce((sum, apt) => sum + apt.service.price, 0);

    res.json({
      success: true,
      data: {
        todayAppointments,
        pendingCount,
        confirmedCount,
        completedCount,
        totalRevenue: revenue,
      },
    } as ApiResponse);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};
