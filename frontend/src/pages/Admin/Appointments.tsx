import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { appointmentAPI } from '../../services/api';
import { Appointment } from '../../types';
import AdminLayout from '../../components/AdminLayout';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: '',
    date: '',
  });

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll(filter);
      setAppointments(response.data.data.appointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await appointmentAPI.update(id, { status });
      loadAppointments();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch hẹn này?')) return;

    try {
      await appointmentAPI.delete(id);
      loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
        <p className="text-gray-600 mt-2">Xem và quản lý tất cả lịch hẹn</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ngày khám
            </label>
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilter({ status: '', date: '' })}
              className="btn-secondary w-full"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-600">Không có lịch hẹn nào</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Khách hàng
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Dịch vụ
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Bác sĩ
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Ngày & Giờ
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">
                      {apt.customerName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {apt.customerPhone}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-900">{apt.service?.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-900">
                      {apt.doctor?.fullName || '-'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-900">
                      {formatDate(apt.appointmentDate)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {apt.appointmentTime}
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(apt.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {apt.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'confirmed')}
                          className="text-green-600 hover:text-green-700"
                          title="Xác nhận"
                        >
                          ✅
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'completed')}
                          className="text-blue-600 hover:text-blue-700"
                          title="Hoàn thành"
                        >
                          ✔️
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(apt.id, 'cancelled')}
                        className="text-red-600 hover:text-red-700"
                        title="Hủy"
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="text-gray-600 hover:text-gray-700"
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Appointments;
