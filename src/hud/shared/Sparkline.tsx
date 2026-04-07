import React, { useId, useMemo } from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
  animated?: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({
  data,
  color,
  width = 60,
  height = 20,
  animated = true,
}) => {
  const id = useId();
  const gradientId = `spark-grad-${id}`;

  const { points, totalLength } = useMemo(() => {
    if (data.length < 2) return { points: '', totalLength: 0 };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;
    const drawWidth = width - padding * 2;
    const drawHeight = height - padding * 2;

    const coords = data.map((v, i) => ({
      x: padding + (i / (data.length - 1)) * drawWidth,
      y: padding + drawHeight - ((v - min) / range) * drawHeight,
    }));

    const polyline = coords.map((c) => `${c.x},${c.y}`).join(' ');

    let len = 0;
    for (let i = 1; i < coords.length; i++) {
      const dx = coords[i].x - coords[i - 1].x;
      const dy = coords[i].y - coords[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }

    return { points: polyline, totalLength: len };
  }, [data, width, height]);

  if (data.length < 2) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={1} />
        </linearGradient>
      </defs>

      <polyline
        points={points}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={animated ? {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
          animation: 'sparkline-draw 1s ease-out forwards 0.8s',
        } : undefined}
      />

      <style>{`
        @keyframes sparkline-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
};

export default Sparkline;
