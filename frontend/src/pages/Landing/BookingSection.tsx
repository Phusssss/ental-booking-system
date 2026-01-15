import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { serviceAPI, doctorAPI, timeSlotAPI, appointmentAPI } from '../../services/api';
import { Service, Doctor, TimeSlot } from '../../types';

const BookingSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.appointmentDate && formData.doctorId) {
      checkAvailability();
    }
  }, [formData.appointmentDate, formData.doctorId]);

  const loadInitialData = async () => {
    try {
      const [servicesRes, doctorsRes, timeSlotsRes] = await Promise.all([
        serviceAPI.getAll(true),
        doctorAPI.getAll(true),
        timeSlotAPI.getAll(),
      ]);
      setServices(servicesRes.data.data);
      setDoctors(doctorsRes.data.data);
      setTimeSlots(timeSlotsRes.data.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await timeSlotAPI.checkAvailability(
        formData.appointmentDate,
        Number(formData.doctorId)
      );
      const available = response.data.data.availableSlots.map((slot: TimeSlot) => slot.time);
      setAvailableSlots(available);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await appointmentAPI.create({
        ...formData,
        serviceId: Number(formData.serviceId),
        doctorId: formData.doctorId ? Number(formData.doctorId) : undefined,
      });

      setSuccess(true);
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        serviceId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đặt lịch khám
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Điền thông tin bên dưới, chúng tôi sẽ liên hệ xác nhận sớm nhất
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✅ Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0901234567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email (không bắt buộc)
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            {/* Dịch vụ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dịch vụ <span className="text-red-500">*</span>
              </label>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">-- Chọn dịch vụ --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {new Intl.NumberFormat('vi-VN').format(service.price)}đ
                  </option>
                ))}
              </select>
            </div>

            {/* Bác sĩ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bác sĩ (không bắt buộc)
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ngày khám */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày khám <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Giờ khám */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giờ khám <span className="text-red-500">*</span>
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">-- Chọn giờ --</option>
                  {timeSlots.map((slot) => {
                    const isBooked = 
                      formData.appointmentDate &&
                      formData.doctorId &&
                      !availableSlots.includes(slot.time);
                    
                    return (
                      <option
                        key={slot.id}
                        value={slot.time}
                        disabled={!!isBooked}
                      >
                        {slot.time}
                        {isBooked && ' (Đã đặt)'}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang xử lý...' : 'Đặt lịch ngay 📅'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
