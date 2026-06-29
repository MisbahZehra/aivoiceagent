'use client';

import type { ChartDataPoint } from '@/lib/types';

interface CallsTrendChartProps {
  data: ChartDataPoint[];
}

export default function CallsTrendChart({ data }: CallsTrendChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const width = 640;
  const height = 260;
  const padding = 24;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((point, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = padding + chartHeight - (point.value / maxValue) * chartHeight;
    return { ...point, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding} ${padding + chartHeight} L ${points[0]?.x ?? padding} ${padding + chartHeight} Z`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Performance trend</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">Monthly calls</h3>
        </div>
        <span className="text-sm text-slate-500">Updated 5m ago</span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full min-w-[520px]">
          <defs>
            <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((line) => {
            const y = padding + (line / 4) * chartHeight;
            return (
              <line
                key={line}
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          <path d={areaPath} fill="url(#callsGradient)" />
          <path d={linePath} fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

          {points.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="5" fill="#0284c7" />
              <text x={point.x} y={height - 4} textAnchor="middle" className="fill-slate-500 text-[11px]">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
