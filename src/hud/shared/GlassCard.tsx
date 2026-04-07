import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const baseStyle: React.CSSProperties = {
  background: 'rgba(10, 16, 30, 0.70)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: 8,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: '16px 20px',
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className, style }) => {
  return (
    <motion.div
      className={className}
      style={{ ...baseStyle, ...style }}
      whileHover={{
        boxShadow:
          '0 0 25px rgba(0,255,204,0.12), inset 0 0 25px rgba(0,255,204,0.04)',
        borderColor: 'rgba(0,255,204,0.30)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
