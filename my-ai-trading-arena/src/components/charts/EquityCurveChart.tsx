/**
 * EquityCurveChart — line chart showing capital growth over time
 */

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { generateEquityCurve } from '../../services/mockData';
import { MODEL_PROFILES, MODEL_COLORS } from '../../lib/constants';
import type { ModelId } from '../../types';

interface EquityCurveChartProps {
  selectedModel: ModelId | null;
  /** Trigger re-render with new data periodically */
  tick?: number;
}

export function EquityCurveChart({ selectedModel, tick = 0 }: EquityCurveChartProps) {
  const data = useMemo(() => generateEquityCurve(), [tick]);

  const modelsToShow = selectedModel
    ? MODEL_PROFILES.filter((m) => m.id === selectedModel)
    : MODEL_PROFILES;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-primary)" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
          tickLine={false}
          axisLine={{ stroke: 'var(--color-border-primary)' }}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
          formatter={(value: unknown, name: unknown) => [
            `$${Number(value).toFixed(2)}`,
            String(name).charAt(0).toUpperCase() + String(name).slice(1),
          ]}
        />
        {modelsToShow.map((model) => (
          <Line
            key={model.id}
            type="monotone"
            dataKey={model.id}
            stroke={MODEL_COLORS[model.id as ModelId]}
            strokeWidth={selectedModel === model.id ? 3 : 1.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
        {!selectedModel && (
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
