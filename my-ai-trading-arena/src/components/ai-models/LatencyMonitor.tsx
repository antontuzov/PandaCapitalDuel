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
    <div className="space-y-2">
      {data.map((latency) => {
        const model = getModelProfile(latency.modelId);
        const isGood = latency.avgLatency < 15;
        const isOk = latency.avgLatency < 25;

        return (
          <div
            key={latency.modelId}
            className="flex items-center justify-between p-2.5 rounded-lg bg-bg-tertiary/50"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: model.color }}
              />
              <span className="text-sm font-bold" style={{ color: model.color }}>
                {model.name}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="text-text-muted">
                Min: <span className="text-text-secondary">{latency.minLatency.toFixed(0)}ms</span>
              </div>
              <div className={cn(
                'font-bold text-sm',
                isGood ? 'text-green-500' : isOk ? 'text-yellow-500' : 'text-red-500'
              )}>
                <Zap className="w-3 h-3 inline mr-1" />
                {latency.avgLatency.toFixed(0)}ms
              </div>
              <div className="text-text-muted">
                Max: <span className="text-text-secondary">{latency.maxLatency.toFixed(0)}ms</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
