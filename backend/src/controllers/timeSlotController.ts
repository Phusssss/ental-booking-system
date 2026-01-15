import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiResponse } from '../types';

const prisma = new PrismaClient();

// Lấy danh sách khung giờ (Public)
export const getTimeSlots = async (req: Request, res: Response) => {
  try {
    const timeSlots = await prisma.timeSlot.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({
      success: true,
      data: timeSlots,
    } as ApiResponse);
  } catch (error) {
    console.error('Get time slots error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Kiểm tra khung giờ còn trống (Public)
export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { date, doctorId } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Thiếu thông tin ngày',
      } as ApiResponse);
    }

    const targetDate = new Date(date as string);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Lấy tất cả lịch hẹn trong ngày
    const where: any = {
      appointmentDate: {
        gte: targetDate,
        lt: nextDay,
      },
      status: {
        in: ['pending', 'confirmed'],
      },
    };

    if (doctorId) {
      where.doctorId = Number(doctorId);
    }

    const bookedAppointments = await prisma.appointment.findMany({
      where,
      select: {
        appointmentTime: true,
      },
    });

    const bookedTimes = bookedAppointments.map((apt) => apt.appointmentTime);

    // Lấy tất cả time slots
    const allTimeSlots = await prisma.timeSlot.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    // Filter ra những slot còn trống
    const availableSlots = allTimeSlots.filter(
      (slot) => !bookedTimes.includes(slot.time)
    );

    res.json({
      success: true,
      data: {
        availableSlots,
        bookedTimes,
      },
    } as ApiResponse);
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};
