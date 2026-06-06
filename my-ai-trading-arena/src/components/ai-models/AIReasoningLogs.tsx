/**
 * AIReasoningLogs — console-like panel showing AI model reasoning
 */

import { useRef, useEffect } from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { cn, formatRelativeTime } from '../../lib/utils';
import { getModelProfile } from '../../lib/constants';
import type { AIReasoningEntry } from '../../types';

interface AIReasoningLogsProps {
  logs: AIReasoningEntry[];
  maxEntries?: number;
}

export function AIReasoningLogs({ logs, maxEntries = 20 }: AIReasoningLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs.length]);

  const displayLogs = logs.slice(0, maxEntries);

  return (
    <div
      ref={scrollRef}
      className="max-h-[320px] overflow-y-auto space-y-2 font-mono text-xs"
    >
      {displayLogs.length === 0 ? (
        <div className="text-center py-6 text-text-muted">
          <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Waiting for AI reasoning output...</p>
        </div>
      ) : (
        displayLogs.map((log) => {
          const model = getModelProfile(log.modelId);
          return (
            <div
              key={log.id}
              className={cn(
                'p-3 rounded-lg border-l-2 bg-bg-tertiary/50',
                'animate-fade-in'
              )}
              style={{ borderLeftColor: model.color }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: model.color }}
                  />
                  <span className="font-bold" style={{ color: model.color }}>
                    {model.name}
                  </span>
                  <span className="text-text-muted text-[10px]">
                    {log.tradeAction && (
                      <span className="flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        {log.tradeAction.side.toUpperCase()} {log.tradeAction.quantity.toFixed(4)} {log.tradeAction.symbol.replace('USDT', '')}/USDT
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-text-muted text-[10px]">
                  {formatRelativeTime(log.timestamp)}
                </span>
              </div>

              {/* Reasoning text */}
              <p className="text-text-secondary leading-relaxed">
                {log.text}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
