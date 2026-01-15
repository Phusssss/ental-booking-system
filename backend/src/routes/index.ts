import { Router } from 'express';
import { authMiddleware, adminOnly } from '../middleware/auth';

// Controllers
import * as authController from '../controllers/authController';
import * as appointmentController from '../controllers/appointmentController';
import * as serviceController from '../controllers/serviceController';
import * as doctorController from '../controllers/doctorController';
import * as timeSlotController from '../controllers/timeSlotController';

const router = Router();

// ==================== PUBLIC ROUTES ====================

// Auth
router.post('/auth/login', authController.login);

// Services (Public - xem danh sách)
router.get('/services', serviceController.getServices);

// Doctors (Public - xem danh sách)
router.get('/doctors', doctorController.getDoctors);

// Time Slots (Public)
router.get('/time-slots', timeSlotController.getTimeSlots);
router.get('/time-slots/availability', timeSlotController.checkAvailability);

// Appointments (Public - tạo lịch hẹn)
router.post('/appointments', appointmentController.createAppointment);

// ==================== PROTECTED ROUTES (ADMIN) ====================

// Auth
router.get('/auth/me', authMiddleware, authController.getMe);

// Dashboard
router.get('/admin/dashboard', authMiddleware, appointmentController.getDashboardStats);

// Appointments (Admin)
router.get('/admin/appointments', authMiddleware, appointmentController.getAppointments);
router.get('/admin/appointments/:id', authMiddleware, appointmentController.getAppointmentById);
router.put('/admin/appointments/:id', authMiddleware, appointmentController.updateAppointment);
router.delete('/admin/appointments/:id', authMiddleware, appointmentController.deleteAppointment);

// Services (Admin)
router.post('/admin/services', authMiddleware, adminOnly, serviceController.createService);
router.put('/admin/services/:id', authMiddleware, adminOnly, serviceController.updateService);
router.delete('/admin/services/:id', authMiddleware, adminOnly, serviceController.deleteService);

// Doctors (Admin)
router.post('/admin/doctors', authMiddleware, adminOnly, doctorController.createDoctor);
router.put('/admin/doctors/:id', authMiddleware, adminOnly, doctorController.updateDoctor);
router.delete('/admin/doctors/:id', authMiddleware, adminOnly, doctorController.deleteDoctor);

export default router;
