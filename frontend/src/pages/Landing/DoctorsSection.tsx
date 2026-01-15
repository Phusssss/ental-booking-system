import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doctorAPI } from '../../services/api';
import { Doctor } from '../../types';

const DoctorsSection: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await doctorAPI.getAll(true);
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="doctors" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 border-4 border-primary-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-40 h-40 border-4 border-accent-200 rounded-full opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Đội ngũ chuyên gia
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đội ngũ bác sĩ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bác sĩ giàu kinh nghiệm, tận tâm với nghề
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Gradient glow effect */}
                <div className="absolute inset-0 bg-primary-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity" />
                
                <div className="relative bg-white rounded-2xl shadow-lg p-8 text-center border border-neutral-200 group-hover:border-primary-400 transition-all">
                  {/* Avatar with animated ring */}
                  <div className="relative inline-block mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, #0ea5e9, #8b5cf6, #0ea5e9)',
                        padding: '4px',
                      }}
                    />
                    <div className="relative bg-white rounded-full p-2">
                      <img
                        src={doctor.avatar || 'https://i.pravatar.cc/150'}
                        alt={doctor.fullName}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                    
                    {/* Rating badge with animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="absolute -bottom-2 -right-2 bg-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg"
                    >
                      {doctor.rating}⭐
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {doctor.fullName}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-3 text-lg">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {doctor.description}
                  </p>

                  {/* Experience badge */}
                  <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full">
                    <svg
                      className="w-5 h-5 mr-2 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">
                      {doctor.experience} năm kinh nghiệm
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent rounded-2xl pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '15+', label: 'Bác sĩ chuyên khoa' },
            { number: '10K+', label: 'Khách hàng hài lòng' },
            { number: '20+', label: 'Năm kinh nghiệm' },
            { number: '98%', label: 'Đánh giá 5 sao' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsSection;
