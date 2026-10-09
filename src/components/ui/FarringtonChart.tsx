import React, { useState } from 'react';
import { FarringtonDayPoint } from '../../types';

interface FarringtonChartProps {
  data: FarringtonDayPoint[];
  currentSigma?: number;
}

export const FarringtonChart: React.FC<FarringtonChartProps> = ({
  data,
  currentSigma = 2.8
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(6);
  const [showBaseline, setShowBaseline] = useState(true);
  const [showBand, setShowBand] = useState(true);

  // SVG coordinate dimensions
  const width = 640;
  const height = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Max value calculation for clean scaling
  const maxVal = 160;
  const minVal = 0;

  const getX = (index: number) => {
    return padLeft + (index / (data.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    return padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  };

  // Build SVG path strings using smooth cubic beziers
  const buildSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const observedPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.observed) }));
  const baselinePoints = data.map((d, i) => ({ x: getX(i), y: getY(d.baselineCeiling) }));
  
  // Upper and lower band adjusted by currentSigma
  const upperBandPoints = data.map((d, i) => {
    // Dynamic sigma adjustment: baseline + (ceiling - baseline)*sigma/2.8
    const sigmaOffset = (d.upperBand - d.baselineCeiling) * (currentSigma / 2.8);
    return { x: getX(i), y: getY(d.baselineCeiling + sigmaOffset) };
  });

  const lowerBandPoints = data.map((d, i) => {
    const sigmaOffset = (d.baselineCeiling - d.lowerBand) * (currentSigma / 2.8);
    return { x: getX(i), y: getY(Math.max(0, d.baselineCeiling - sigmaOffset)) };
  });

  // Area under observed curve
  const observedAreaPath = `${buildSmoothPath(observedPoints)} L ${getX(data.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`;

  // Shaded tolerance corridor between upper and lower band
  let bandAreaPath = '';
  if (upperBandPoints.length > 0 && lowerBandPoints.length > 0) {
    bandAreaPath = buildSmoothPath(upperBandPoints);
    for (let i = lowerBandPoints.length - 1; i >= 0; i--) {
      bandAreaPath += ` L ${lowerBandPoints[i].x} ${lowerBandPoints[i].y}`;
    }
    bandAreaPath += ' Z';
  }

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const activeX = hoverIndex !== null ? getX(hoverIndex) : getX(data.length - 1);
  const activeY = hoverIndex !== null ? getY(activePoint.observed) : getY(activePoint.observed);

  // Y-axis grid lines (0, 40, 80, 120, 160)
  const yTicks = [0, 40, 80, 120, 160];

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Chart Header & Top-Right Metrics Legend (Identical to Inspo "Sales & Returns") */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-border-subtle">
        <div>
          <h3 className="text-[15px] font-semibold text-primary tracking-tight">Surveillance & Baseline Curve</h3>
          <p className="text-[12px] text-secondary mt-0.5">
            Total presentations up 18%, while baseline ceiling remains stable
          </p>
        </div>

        {/* Inspo-Style Top Right Legend with Big Numbers & Soft Pill Badges */}
        <div className="flex items-center gap-5 self-end sm:self-auto">
          {/* Legend Item 1: Observed cases */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-[12px] font-medium text-secondary">Observed cases</span>
            <span className="text-[18px] font-bold text-primary font-sans tabular-nums">4,782</span>
            <span className="pill-green">+7%</span>
          </div>

          {/* Legend Item 2: Baseline Ceiling */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
            <span className="text-[12px] font-medium text-secondary">Ceiling</span>
            <span className="text-[18px] font-bold text-primary font-sans tabular-nums">503</span>
            <span className="pill-red">-12%</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full overflow-hidden bg-transparent pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[210px] select-none"
          onMouseLeave={() => setHoverIndex(data.length - 1)}
        >
          <defs>
            {/* Mint Green Gradient Fill under Observed Curve */}
            <linearGradient id="inspoGreenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
            </linearGradient>

            {/* Soft Gray Baseline Gradient Fill */}
            <linearGradient id="inspoGrayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines matching Inspo (dashed gray lines) */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#F1F3F6"
                  strokeWidth="1.2"
                  strokeDasharray="3,3"
                />
                <text
                  x={padLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="11"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="500"
                  fill="#94A3B8"
                >
                  {val === 160 ? '10k' : val === 120 ? '5k' : val === 80 ? '1k' : val === 40 ? '500' : '0'}
                </text>
              </g>
            );
          })}

          {/* Baseline Area */}
          <path 
            d={`${buildSmoothPath(baselinePoints)} L ${getX(data.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`} 
            fill="url(#inspoGrayGradient)" 
          />

          {/* Smooth Gray Baseline Curve */}
          <path
            d={buildSmoothPath(baselinePoints)}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Observed Area */}
          <path d={observedAreaPath} fill="url(#inspoGreenGradient)" />

          {/* Observed Surge Curve (Vibrant Mint Emerald matching inspo) */}
          <path
            d={buildSmoothPath(observedPoints)}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive vertical hover indicator line */}
          {hoverIndex !== null && (
            <line
              x1={activeX}
              y1={padTop}
              x2={activeX}
              y2={height - padBottom}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          )}

          {/* Day X-Axis Labels & Hover Hitboxes */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoverIndex === i;
            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const dayLabel = dayNames[i] || d.date;

            return (
              <g key={d.day}>
                {/* Invisible hover hitbox */}
                <rect
                  x={x - chartW / (data.length * 2)}
                  y={padTop}
                  width={chartW / data.length}
                  height={chartH + padBottom}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(i)}
                />

                {/* Day label */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight={isHovered ? '700' : '500'}
                  fill={isHovered ? '#111827' : '#94A3B8'}
                >
                  {dayLabel}
                </text>

                {/* Marker circle */}
                <circle
                  cx={x}
                  cy={getY(d.observed)}
                  r={isHovered ? 5 : 3.5}
                  fill={isHovered ? '#FFFFFF' : '#10B981'}
                  stroke="#10B981"
                  strokeWidth={isHovered ? 3 : 2}
                />
              </g>
            );
          })}

          {/* Active tooltip marker ring */}
          {hoverIndex !== null && (
            <g transform={`translate(${activeX}, ${activeY})`}>
              <circle r="8" fill="#10B981" fillOpacity="0.25" />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Bubble (Exact match to "14 March 2:39 PM / 4,782 sales" in Inspo) */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute pointer-events-none bg-white border border-border-subtle shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-xl px-3 py-1.5 text-center transition-all"
            style={{
              left: `${Math.min(width - 140, Math.max(30, activeX - 60))}px`,
              top: `${Math.max(5, activeY - 50)}px`
            }}
          >
            <div className="text-[10px] text-secondary font-medium whitespace-nowrap">
              14 March 2:39 PM
            </div>
            <div className="text-[12px] font-bold text-primary font-sans tabular-nums whitespace-nowrap">
              {activePoint.observed > 100 ? '4,782 sales' : `${activePoint.observed * 32} presentations`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
