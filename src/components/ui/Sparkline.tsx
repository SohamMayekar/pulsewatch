import React from 'react';
import { StatusLevel } from '../../types';

interface SparklineProps {
  data: number[];
  status?: StatusLevel;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  status = 'normal',
  width = 90,
  height = 24
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const pad = 3;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((val, idx) => {
    const x = pad + (idx / (data.length - 1)) * w;
    const y = pad + h - ((val - min) / range) * h;
    return `${x},${y}`;
  });

  const pathStr = `M ${points.join(' L ')}`;

  const strokeColor =
    status === 'alert' ? '#C9574D' : status === 'watch' ? '#C58A35' : '#4D8B69';

  return (
    <svg width={width} height={height} className="overflow-visible select-none inline-block">
      <path
        d={pathStr}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End point marker */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].split(',')[0]}
          cy={points[points.length - 1].split(',')[1]}
          r="2.5"
          fill={strokeColor}
        />
      )}
    </svg>
  );
};
