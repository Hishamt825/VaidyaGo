import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import robotImg from '../../assets/admin.png';

const AdminBot = ({ onOpenChat }) => {
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
            className="fixed z-[9999] cursor-grab active:cursor-grabbing flex items-center justify-center w-28 h-36 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
            onClick={() => {
                if (!isDragging.current && onOpenChat) {
                    onOpenChat();
                }
            }}
        >
            <div className="relative w-full h-full flex items-center justify-center overflow-visible z-10">
                <img
                    src={robotImg}
                    alt="AI Admin Bot"
                    draggable="false"
                    className="w-full h-full object-contain scale-[1.2] transition-all duration-300 hover:scale-[1.25] drop-shadow-[0_0_15px_rgba(24,114,138,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(24,114,138,0.8)]"
                />
            </div>
        </motion.div>
    );
};

export default AdminBot;
