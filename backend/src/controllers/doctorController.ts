import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateDoctorDto, ApiResponse } from '../types';

const prisma = new PrismaClient();

// Lấy danh sách bác sĩ (Public)
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    res.json({
      success: true,
      data: doctors,
    } as ApiResponse);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Tạo bác sĩ mới (Admin)
export const createDoctor = async (req: Request, res: Response) => {
  try {
    const data: CreateDoctorDto = req.body;

    if (!data.fullName || !data.specialty || !data.experience) {
      return res.status(400).json({
        success: false,
        error: 'Thiếu thông tin bắt buộc',
      } as ApiResponse);
    }

    const doctor = await prisma.doctor.create({
      data,
    });

    res.status(201).json({
      success: true,
      data: doctor,
      message: 'Tạo bác sĩ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Cập nhật bác sĩ (Admin)
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<CreateDoctorDto> = req.body;

    const doctor = await prisma.doctor.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      success: true,
      data: doctor,
      message: 'Cập nhật bác sĩ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Xóa bác sĩ (Admin)
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.doctor.delete({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: 'Xóa bác sĩ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};
