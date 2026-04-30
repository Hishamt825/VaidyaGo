import React from 'react';
import { motion } from 'framer-motion';
import robotImg from '../../assets/robot.jpeg';

const DraggableRobot = () => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0}
            style={{ 
                touchAction: 'none',
                top: '80%',
                left: '85%'
            }}
            className="fixed z-[9999] cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
        >
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#19718A] shadow-2xl bg-white flex items-center justify-center p-1">
                <img 
                    src={robotImg} 
                    alt="Robot" 
                    draggable="false"
                    className="w-full h-full object-cover rounded-full pointer-events-none"
                />
            </div>
            
            {/* Pulsing Aura Effect */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[#19718A] rounded-full -z-10"
            />
        </motion.div>
    );
};

export default DraggableRobot;
