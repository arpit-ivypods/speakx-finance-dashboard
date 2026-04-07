import React from 'react';

interface StatusDotProps {
  color?: string;
  size?: number;
  delay?: number;
}

const StatusDot: React.FC<StatusDotProps> = ({
  color = '#00FFCC',
  size = 8,
  delay = 0,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        display: 'inline-block',
        flexShrink: 0,
        animation: `pulseDot 2s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default StatusDot;
