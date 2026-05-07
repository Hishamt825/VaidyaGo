import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import robotImg from '../../assets/bot_black.png';

const PatientBot = ({ onOpenChat }) => {
    const isDragging = useRef(false);

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
                isDragging.current = true;
            }}
            onDragEnd={() => {
                setTimeout(() => {
                    isDragging.current = false;
                }, 100);
            }}
            style={{ 
                touchAction: 'none',
                top: '75%',
                left: '88%'
            }}
            className="fixed z-[9999] cursor-grab active:cursor-grabbing flex items-center justify-center w-28 h-32"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
            onClick={() => {
                if (!isDragging.current && onOpenChat) {
                    onOpenChat();
                }
            }}
        >
            {/* Final Clean Structure: Just the character with absolute transparency */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible z-10">
                <img 
                    src={robotImg} 
                    alt="Vaidya Bot" 
                    draggable="false"
                    className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                />
            </div>
        </motion.div>
    );
};

export default PatientBot;



