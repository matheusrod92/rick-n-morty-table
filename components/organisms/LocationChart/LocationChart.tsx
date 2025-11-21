'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { LocationData } from '@/hooks/useCharacters';
import './LocationChart.css';

export interface LocationChartProps {
  data: LocationData[];
  title?: string;
  className?: string;
}

const COLORS = [
  '#0070f3',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#16a34a',
  '#0891b2',
  '#4f46e5',
  '#c026d3',
  '#dc2626',
  '#ca8a04',
];

export function LocationChart({
  data,
  title = 'Characters by Location',
  className = '',
}: LocationChartProps) {
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.count, 0),
    [data]
  );

  if (data.length === 0) {
    return (
      <div className={`location-chart ${className}`.trim()}>
        <h3 className="location-chart__title">{title}</h3>
        <div className="location-chart__empty">
          <p>No location data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`location-chart ${className}`.trim()}>
      <h3 className="location-chart__title">{title}</h3>

      <div className="location-chart__content">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
