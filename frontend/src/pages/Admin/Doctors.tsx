import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doctorAPI } from '../../services/api';
import { Doctor } from '../../types';
import AdminLayout from '../../components/AdminLayout';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    specialty: '',
    experience: '',
    avatar: '',
    description: '',
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        experience: Number(formData.experience),
      };

      if (editingDoctor) {
        await doctorAPI.update(editingDoctor.id, data);
      } else {
        await doctorAPI.create(data);
      }

      setShowModal(false);
      resetForm();
      loadDoctors();
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      fullName: doctor.fullName,
      specialty: doctor.specialty,
      experience: doctor.experience.toString(),
      avatar: doctor.avatar || '',
      description: doctor.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa bác sĩ này?')) return;

    try {
      await doctorAPI.delete(id);
      loadDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      specialty: '',
      experience: '',
      avatar: '',
      description: '',
    });
    setEditingDoctor(null);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
          <p className="text-gray-600 mt-2">Thêm, sửa, xóa bác sĩ</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Thêm bác sĩ
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card text-center"
            >
              <img
                src={doctor.avatar || 'https://i.pravatar.cc/150'}
                alt={doctor.fullName}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary-100"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {doctor.fullName}
              </h3>
              <p className="text-primary-600 font-semibold mb-2">
                {doctor.specialty}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {doctor.description}
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4 pb-4 border-b">
                {doctor.experience} năm kinh nghiệm • {doctor.rating}⭐
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(doctor)}
                  className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingDoctor ? 'Sửa bác sĩ' : 'Thêm bác sĩ mới'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chuyên môn *
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kinh nghiệm (năm) *
                  </label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 btn-primary">
                  {editingDoctor ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 btn-secondary"
                >
                  Hủy
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Doctors;
