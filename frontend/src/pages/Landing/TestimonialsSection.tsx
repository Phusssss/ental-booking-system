import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment:
      'Dịch vụ tuyệt vời! Bác sĩ rất tận tâm và chu đáo. Phòng khám sạch sẽ, hiện đại.',
    service: 'Niềng răng',
    date: '2 tuần trước',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment:
      'Đặt lịch online rất tiện, không phải chờ đợi lâu. Giá cả hợp lý, chất lượng tốt.',
    service: 'Tẩy trắng răng',
    date: '1 tháng trước',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    comment:
      'Cảm ơn đội ngũ bác sĩ đã giúp tôi có nụ cười đẹp. Rất hài lòng với kết quả!',
    service: 'Bọc răng sứ',
    date: '3 tuần trước',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment:
      'Phòng khám rất chuyên nghiệp, bác sĩ tư vấn kỹ càng. Tôi sẽ giới thiệu cho bạn bè.',
    service: 'Cấy ghép Implant',
    date: '1 tuần trước',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment:
      'Quy trình khám nhanh gọn, không đau. Giá cả minh bạch, không phát sinh chi phí.',
    service: 'Nhổ răng khôn',
    date: '2 tháng trước',
  },
  {
    id: 6,
    name: 'Đỗ Thị F',
    avatar: 'https://i.pravatar.cc/150?img=16',
    rating: 5,
    comment:
      'Nụ cười của tôi đã thay đổi hoàn toàn. Cảm ơn đội ngũ bác sĩ rất nhiều!',
    service: 'Niềng răng invisalign',
    date: '3 tháng trước',
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - itemsPerPage) : Math.max(0, prev - itemsPerPage)
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">

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
              Đánh giá từ khách hàng
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn khách hàng hài lòng với dịch vụ của chúng tôi
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group hover:scale-105 hover:-translate-y-2 transition-transform duration-200"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity" />
                
                <div className="relative bg-white rounded-2xl shadow-xl p-8 h-full border border-neutral-200 group-hover:border-primary-300 transition-all">
                  <div className="absolute top-4 right-4 text-6xl text-primary-100 select-none pointer-events-none">
                    "
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>

                    {/* Comment */}
                    <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Service tag */}
                    <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      {testimonial.service}
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="relative w-14 h-14 rounded-full object-cover border-2 border-primary-100"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-500">Khách hàng</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {testimonial.date}
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="bg-white text-primary-600 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`h-3 rounded-full transition-all hover:scale-125 ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 w-3'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white text-primary-600 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { icon: '⭐', text: '4.9/5 Đánh giá' },
            { icon: '✓', text: '100% Hài lòng' },
            { icon: '🏆', text: 'Top 10 Phòng khám' },
            { icon: '💎', text: 'Chất lượng cao' },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md"
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-semibold text-gray-700">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
