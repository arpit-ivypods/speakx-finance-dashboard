import React from 'react';

interface GlowTextProps {
  children: React.ReactNode;
  color: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  className?: string;
}

/**
 * Converts a hex color string to an rgba string at a given alpha.
 * Supports #RGB, #RRGGBB, and bare forms.
 */
function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const GlowText: React.FC<GlowTextProps> = ({
  children,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  className,
}) => {
  const shadowColor = hexToRgba(color, 0.4);

  return (
    <span
      className={className}
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        filter: `drop-shadow(0 0 8px ${shadowColor})`,
      }}
    >
      {children}
    </span>
  );
};

export default GlowText;
