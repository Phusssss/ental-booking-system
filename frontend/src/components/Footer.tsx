import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🦷</span>
              <span className="text-xl font-bold">Nha Khoa Smile</span>
            </div>
            <p className="text-gray-400">
              Phòng khám nha khoa uy tín với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  Bác sĩ
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Đánh giá
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Đặt lịch
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
              <li>📞 0901 234 567</li>
              <li>✉️ contact@nhakhoasmile.vn</li>
              <li>🕐 8:00 - 20:00 (Thứ 2 - CN)</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Theo dõi</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                F
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                Z
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                IG
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Nha Khoa Smile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
