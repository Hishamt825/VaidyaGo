import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import robotImg from '../../assets/doctor_bot.png';

const DoctorBot = () => {
    const navigate = useNavigate();
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
            className="fixed z-[9999] cursor-grab active:cursor-grabbing flex items-center justify-center w-36 h-48 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
            onClick={() => {
                if (!isDragging.current) {
                    navigate('/Bot');
                }
            }}
        >
            <div className="relative w-full h-full flex items-center justify-center overflow-visible z-10">
                <img 
                    src={robotImg} 
                    alt="AI Doctor Bot" 
                    draggable="false"
                    className="w-full h-full object-contain scale-[1.4] transition-all duration-300 hover:scale-[1.45] drop-shadow-[0_0_15px_rgba(26,115,140,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(26,115,140,0.8)]"
                />
            </div>
        </motion.div>
    );
};

export default DoctorBot;
