import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import Chat from './chat';
import robotImage from '../../../assets/869455f37775ce0db978b4ab2fcf8919-Picsart-BackgroundRemover.jpg';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        {/* Chat Window */}
        <Chat isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Floating Trigger */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -10, 0] 
            }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition-transform duration-300"
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center overflow-visible">
              <img src={robotImage} alt="AI Assistant" className="w-full h-full object-contain" />
            </div>
            
            {/* Tooltip/Label */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 hidden md:block whitespace-nowrap"
            >
              <span className="text-sm font-medium text-slate-700">{t('needHelp')}</span>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-slate-100"></div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FloatingChatbot;
