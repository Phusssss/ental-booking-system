import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateServiceDto, ApiResponse } from '../types';

const prisma = new PrismaClient();

// Lấy danh sách dịch vụ (Public)
export const getServices = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: services,
    } as ApiResponse);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Tạo dịch vụ mới (Admin)
export const createService = async (req: Request, res: Response) => {
  try {
    const data: CreateServiceDto = req.body;

    if (!data.name || !data.price || !data.duration) {
      return res.status(400).json({
        success: false,
        error: 'Thiếu thông tin bắt buộc',
      } as ApiResponse);
    }

    const service = await prisma.service.create({
      data,
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Tạo dịch vụ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Cập nhật dịch vụ (Admin)
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<CreateServiceDto> = req.body;

    const service = await prisma.service.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      success: true,
      data: service,
      message: 'Cập nhật dịch vụ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};

// Xóa dịch vụ (Admin)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: 'Xóa dịch vụ thành công',
    } as ApiResponse);
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
    } as ApiResponse);
  }
};
