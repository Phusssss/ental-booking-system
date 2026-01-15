import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'call',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Gọi ngay',
      color: 'from-green-500 to-emerald-600',
      action: () => window.location.href = 'tel:02812345678',
    },
    {
      id: 'zalo',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.97L2.05 21.95l4.098-1.905C7.813 21.348 9.826 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.5 13.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h7c.276 0 .5.224.5.5s-.224.5-.5.5zm0-3h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h7c.276 0 .5.224.5.5s-.224.5-.5.5zm0-3h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h7c.276 0 .5.224.5.5s-.224.5-.5.5z"/>
        </svg>
      ),
      label: 'Chat Zalo',
      color: 'from-blue-500 to-blue-600',
      action: () => window.open('https://zalo.me/0901234567', '_blank'),
    },
    {
      id: 'booking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Đặt lịch',
      color: 'from-primary-500 to-primary-600',
      action: () => {
        const bookingSection = document.getElementById('booking');
        bookingSection?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'messenger',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.446 5.51 3.707 7.215V22l3.39-1.862c.905.251 1.864.386 2.903.386 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm.993 12.493l-2.558-2.73-4.993 2.73 5.492-5.831 2.623 2.73 4.928-2.73-5.492 5.831z"/>
        </svg>
      ),
      label: 'Messenger',
      color: 'from-blue-600 to-purple-600',
      action: () => window.open('https://m.me/yourpage', '_blank'),
    },
  ];

  return (
    <>
      {/* Main floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        {/* Action buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 right-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20, scale: 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group`}
                >
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    {action.icon}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden hover:scale-110 active:scale-90 transition-transform"
        >
          {/* Pulse animation - CSS only */}
          <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-50"></div>

          {/* Icon */}
          <div 
            className="relative z-10 transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            {isExpanded ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            )}
          </div>
        </button>

        {/* Tooltip */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          >
            Liên hệ ngay
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Quick call button (always visible) */}
      <a
        href="tel:02812345678"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        {/* Pulse ring - CSS only */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-70"></div>
        
        <svg className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </>
  );
};

export default FloatingActions;
