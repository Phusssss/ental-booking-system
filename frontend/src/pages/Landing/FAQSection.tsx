import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Phòng khám có mở cửa vào cuối tuần không?',
    answer: 'Có, chúng tôi mở cửa từ thứ 2 đến Chủ nhật, từ 8:00 - 20:00. Bạn có thể đặt lịch trước qua website hoặc gọi điện trực tiếp.',
    category: 'general',
  },
  {
    id: 2,
    question: 'Tôi có cần đặt lịch trước không?',
    answer: 'Chúng tôi khuyến khích đặt lịch trước để đảm bảo có bác sĩ và thời gian phù hợp. Tuy nhiên, chúng tôi cũng nhận khách đến trực tiếp nếu có chỗ trống.',
    category: 'booking',
  },
  {
    id: 3,
    question: 'Chi phí khám và điều trị như thế nào?',
    answer: 'Chi phí phụ thuộc vào dịch vụ bạn lựa chọn. Chúng tôi có bảng giá minh bạch và sẽ tư vấn chi tiết trước khi điều trị. Khách hàng mới được giảm 20% cho lần khám đầu tiên.',
    category: 'pricing',
  },
  {
    id: 4,
    question: 'Phòng khám có chấp nhận bảo hiểm y tế không?',
    answer: 'Có, chúng tôi chấp nhận hầu hết các loại bảo hiểm y tế. Vui lòng mang theo thẻ bảo hiểm khi đến khám để được hỗ trợ.',
    category: 'insurance',
  },
  {
    id: 5,
    question: 'Niềng răng mất bao lâu?',
    answer: 'Thời gian niềng răng thường từ 12-24 tháng tùy vào tình trạng răng. Bác sĩ sẽ đánh giá và tư vấn cụ thể sau khi khám.',
    category: 'treatment',
  },
  {
    id: 6,
    question: 'Tẩy trắng răng có hại không?',
    answer: 'Tẩy trắng răng tại phòng khám với công nghệ hiện đại hoàn toàn an toàn. Chúng tôi sử dụng các sản phẩm được FDA chứng nhận và quy trình chuẩn y khoa.',
    category: 'treatment',
  },
  {
    id: 7,
    question: 'Nhổ răng khôn có đau không?',
    answer: 'Chúng tôi sử dụng gây tê cục bộ nên bạn sẽ không cảm thấy đau trong quá trình nhổ răng. Sau đó có thể hơi khó chịu nhưng sẽ được kê đơn thuốc giảm đau.',
    category: 'treatment',
  },
  {
    id: 8,
    question: 'Tôi có thể hủy hoặc đổi lịch hẹn không?',
    answer: 'Có, bạn có thể hủy hoặc đổi lịch hẹn bằng cách gọi điện hoặc nhắn tin cho chúng tôi trước ít nhất 24 giờ.',
    category: 'booking',
  },
];

const categories = [
  { 
    id: 'all', 
    label: 'Tất cả',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: 'general', 
    label: 'Chung',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: 'booking', 
    label: 'Đặt lịch',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: 'treatment', 
    label: 'Điều trị',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: 'pricing', 
    label: 'Chi phí',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: 'insurance', 
    label: 'Bảo hiểm',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
];

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="py-20 bg-neutral-50 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Câu hỏi thường gặp
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giải đáp thắc mắc
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tìm câu trả lời cho những câu hỏi phổ biến nhất
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow'
              }`}
            >
              {category.icon}
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200 hover:border-primary-400 transition-all"
              >
                <button
                  onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <motion.div
                      animate={{ rotate: activeId === faq.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {faq.question}
                    </h3>
                  </div>
                </button>

                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pl-20">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-primary-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Vẫn còn thắc mắc?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:02812345678"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi ngay: (028) 1234 5678
              </motion.a>
              <motion.a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.97L2.05 21.95l4.098-1.905C7.813 21.348 9.826 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
                Chat Zalo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
