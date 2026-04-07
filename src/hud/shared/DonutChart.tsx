import React, { useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: Segment[];
  outerRadius?: number;
  innerRadius?: number;
  showTotal?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Convert polar to cartesian. */
function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/** Create an SVG arc path for a donut segment. */
function describeArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);

  const arcSweep = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${arcSweep} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${arcSweep} 0 ${innerEnd.x} ${innerEnd.y}`,
    'Z',
  ].join(' ');
}

const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  outerRadius = 60,
  innerRadius = 40,
  showTotal = true,
}) => {
  const id = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = useMemo(
    () => segments.reduce((sum, s) => sum + s.value, 0),
    [segments]
  );

  const size = (outerRadius + 10) * 2;
  const cx = size / 2;
  const cy = size / 2;

  // Gap in degrees between segments
  const gapDeg = segments.length > 1 ? 2 : 0;

  const arcs = useMemo(() => {
    const totalGap = gapDeg * segments.length;
    const available = 360 - totalGap;
    let cursor = 0;

    return segments.map((seg, i) => {
      const sweep = total > 0 ? (seg.value / total) * available : 0;
      const startAngle = cursor;
      const endAngle = cursor + sweep;
      cursor = endAngle + gapDeg;

      // Midpoint angle for hover translation direction
      const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
      const tx = Math.cos(midAngle) * 4;
      const ty = Math.sin(midAngle) * 4;

      return {
        ...seg,
        index: i,
        startAngle,
        endAngle,
        d: describeArc(cx, cy, outerRadius, innerRadius, startAngle, endAngle),
        tx,
        ty,
      };
    });
  }, [segments, total, cx, cy, outerRadius, innerRadius, gapDeg]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {arcs.map((arc) => {
        const isHovered = hoveredIndex === arc.index;
        const glowAlpha = isHovered ? 0.55 : 0.3;
        const filterId = `donut-glow-${id}-${arc.index}`;

        return (
          <g key={arc.index}>
            <defs>
              <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="4"
                  floodColor={hexToRgba(arc.color, glowAlpha)}
                />
              </filter>
            </defs>
            <motion.path
              d={arc.d}
              fill={arc.color}
              filter={`url(#${filterId})`}
              initial={{ rotate: -360 }}
              animate={{
                rotate: 0,
                translateX: isHovered ? arc.tx : 0,
                translateY: isHovered ? arc.ty : 0,
              }}
              transition={{
                rotate: { duration: 1, ease: 'easeOut' },
                translateX: { duration: 0.2 },
                translateY: { duration: 0.2 },
              }}
              onMouseEnter={() => setHoveredIndex(arc.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
            />
          </g>
        );
      })}

      {showTotal && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontSize={14}
          fontWeight={700}
          fontFamily="'Inter', sans-serif"
        >
          {total.toLocaleString()}
        </text>
      )}
    </svg>
  );
};

export default DonutChart;
