/**
 * LatencyMonitor — HFT latency display for each model
 */

import { Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getModelProfile } from '../../lib/constants';
import type { LatencyData } from '../../types';

interface LatencyMonitorProps {
  data: LatencyData[];
}

export function LatencyMonitor({ data }: LatencyMonitorProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-4 text-text-muted text-sm font-mono">
        Waiting for latency data...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 text-[10px] font-mono text-text-muted uppercase tracking-wider px-2">
        <span>Model</span>
        <span className="text-center w-16">Avg</span>
        <span className="text-center w-16">Min</span>
        <span className="text-center w-16">Max</span>
        <span className="text-center w-24">Latency</span>
      </div>

      {data.map((latency) => {
        const model = getModelProfile(latency.modelId);
        const isGood = latency.avgLatency < 15;
        const isOk = latency.avgLatency < 25;
        // Bar width relative to max possible latency (50ms)
        const barWidth = Math.min(100, (latency.avgLatency / 50) * 100);

        return (
          <div
            key={latency.modelId}
            className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center p-2.5 rounded-lg bg-bg-tertiary/50"
          >
            {/* Model name */}
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: model.color }}
              />
              <span className="text-sm font-bold" style={{ color: model.color }}>
                {model.name}
              </span>
            </div>

            {/* Avg latency */}
            <div className={cn(
              'font-mono text-xs font-bold text-center w-16',
              isGood ? 'text-green-500' : isOk ? 'text-yellow-500' : 'text-red-500'
            )}>
              <Zap className="w-3 h-3 inline mr-0.5" />
              {latency.avgLatency.toFixed(0)}ms
            </div>

            {/* Min latency */}
            <div className="font-mono text-xs text-text-secondary text-center w-16">
              {latency.minLatency.toFixed(0)}ms
            </div>

            {/* Max latency */}
            <div className="font-mono text-xs text-text-secondary text-center w-16">
              {latency.maxLatency.toFixed(0)}ms
            </div>

            {/* Latency bar */}
            <div className="w-24 h-2 bg-bg-primary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  isGood ? 'bg-green-500' : isOk ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
