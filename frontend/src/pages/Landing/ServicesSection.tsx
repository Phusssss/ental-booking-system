import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { serviceAPI } from '../../services/api';
import { Service } from '../../types';

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Service images mapping
  const serviceImages: { [key: string]: string } = {
    'Niềng răng': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop',
    'Tẩy trắng răng': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop',
    'Implant': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop',
    'Bọc răng sứ': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop',
    'Nhổ răng khôn': 'https://images.unsplash.com/photo-1609840114035-3c981407e31f?w=400&h=300&fit=crop',
    'Khám tổng quát': 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop',
  };

  const getServiceImage = (service: Service) => {
    // Ưu tiên imageUrl từ database
    if (service.imageUrl) {
      return service.imageUrl;
    }
    // Fallback sang mapping cũ
    return serviceImages[service.name] || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop';
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await serviceAPI.getAll(true);
      setServices(response.data.data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <section id="services" className="py-20 bg-neutral-50 relative overflow-hidden">

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
              Dịch vụ chuyên nghiệp
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch vụ nha khoa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ nha khoa với công nghệ hiện đại
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group cursor-pointer"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-primary-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-full border border-neutral-200 group-hover:border-primary-400 transition-all">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getServiceImage(service)}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-neutral-600 mb-6 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Price section */}
                    <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Giá từ</div>
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-neutral-500 mb-1">Thời gian</div>
                        <span className="text-lg font-semibold text-neutral-700">
                          {service.duration} phút
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="absolute bottom-8 right-8 text-primary-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#booking"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all uppercase tracking-wide"
          >
            Đặt lịch ngay
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
