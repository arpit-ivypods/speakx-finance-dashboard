import type { CSSProperties } from 'react';

export const glassStyle: CSSProperties = {
  background: 'rgba(10, 16, 30, 0.70)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '8px',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 0 0px rgba(0,0,0,0)',
  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
};

export const glassHover: CSSProperties = {
  boxShadow: '0 0 20px rgba(0, 255, 204, 0.15), inset 0 0 20px rgba(0, 255, 204, 0.05)',
  borderColor: 'rgba(0, 255, 204, 0.35)',
};
