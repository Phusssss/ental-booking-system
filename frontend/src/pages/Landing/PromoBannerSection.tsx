import React from 'react';
import { motion } from 'framer-motion';

const PromoBannerSection: React.FC = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Banner Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Banner Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder - Thay bằng banner của bạn */}
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=800&fit=crop&q=80"
                alt="Dental Promo Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              
              {/* Overlay gradient để text dễ đọc hơn nếu cần */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Right Side - Quick Booking Form or Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Option 1: Quick Info Cards */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Ưu đãi đặc biệt
                <br />
                <span className="text-primary-600">Tháng này</span>
              </h2>

              {/* Promo Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ),
                    title: 'Giảm 20% lần khám đầu',
                    description: 'Áp dụng cho khách hàng mới',
                    color: 'bg-yellow-500',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: 'Tư vấn miễn phí',
                    description: 'Đặt lịch online - không mất phí',
                    color: 'bg-primary-500',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ),
                    title: 'Bảo hành trọn đời',
                    description: 'Cam kết chất lượng dịch vụ',
                    color: 'bg-green-500',
                  },
                ].map((promo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${promo.color} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {promo.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-neutral-900 mb-1">
                          {promo.title}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={scrollToBooking}
                  className="btn-primary flex-1"
                >
                  Đặt lịch ngay
                </button>
                <a
                  href="tel:0901234567"
                  className="btn-secondary flex-1"
                >
                  Gọi tư vấn
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-neutral-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">10+</div>
                  <div className="text-xs text-neutral-600">Năm kinh nghiệm</div>
                </div>
                <div className="w-px h-10 bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">5K+</div>
                  <div className="text-xs text-neutral-600">Khách hàng</div>
                </div>
                <div className="w-px h-10 bg-neutral-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">98%</div>
                  <div className="text-xs text-neutral-600">Hài lòng</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSection;
