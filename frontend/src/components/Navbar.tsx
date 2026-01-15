import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Aspen Style */}
          <a href="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-primary-600" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 5C11.716 5 5 11.716 5 20s6.716 15 15 15 15-6.716 15-15S28.284 5 20 5zm0 2c7.18 0 13 5.82 13 13s-5.82 13-13 13S7 27.18 7 20 12.82 7 20 7zm-3 8v10h2v-4h2c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4zm2 2h2c1.105 0 2 .895 2 2s-.895 2-2 2h-2v-4z"/>
              </svg>
              <div className="ml-2">
                <div className="text-xl font-bold text-neutral-900 leading-none">
                  DentalCare
                </div>
                <div className="text-xs text-primary-600 font-medium">
                  Nha Khoa Chuyên Nghiệp
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors uppercase tracking-wide"
            >
              Dịch vụ
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors uppercase tracking-wide"
            >
              Bác sĩ
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors uppercase tracking-wide"
            >
              Đánh giá
            </button>
            <a
              href="tel:0901234567"
              className="flex items-center text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0901 234 567
            </a>
            <a
              href="/admin/login"
              className="flex items-center text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors uppercase tracking-wide"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Admin
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('booking')}
              className="btn-primary"
            >
              Đặt lịch ngay
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-neutral-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors uppercase"
              >
                Dịch vụ
              </button>
              <button
                onClick={() => scrollToSection('doctors')}
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors uppercase"
              >
                Bác sĩ
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors uppercase"
              >
                Đánh giá
              </button>
              <a
                href="tel:0901234567"
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                📞 0901 234 567
              </a>
              <a
                href="/admin/login"
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors uppercase"
              >
                👤 Admin
              </a>
              <button
                onClick={() => scrollToSection('booking')}
                className="btn-primary w-full mt-2"
              >
                Đặt lịch ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
