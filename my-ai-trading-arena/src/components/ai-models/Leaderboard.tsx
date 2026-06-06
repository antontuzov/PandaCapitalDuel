/**
 * Leaderboard — live leaderboard table of all AI models
 */

import { Trophy, Medal } from 'lucide-react';
import { cn, formatUSD, formatPercent } from '../../lib/utils';
import { Sparkline } from '../charts/Sparkline';
import { getModelProfile } from '../../lib/constants';
import type { ModelPerformance } from '../../types';

interface LeaderboardProps {
  performance: ModelPerformance[];
}

const rankConfig: Record<number, { color: string; icon: 'trophy' | 'medal' }> = {
  1: { color: 'text-yellow-500', icon: 'trophy' },   // Gold
  2: { color: 'text-gray-400', icon: 'medal' },       // Silver
  3: { color: 'text-amber-600', icon: 'medal' },      // Bronze
};

export function Leaderboard({ performance }: LeaderboardProps) {
  if (performance.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm font-mono">
        Waiting for performance data...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-primary">
            <th className="text-left py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider w-12">#</th>
            <th className="text-left py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Model</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Equity</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">PnL</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">PnL %</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Trades</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Win Rate</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Sharpe</th>
            <th className="text-right py-3 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Performance</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((perf) => {
            const model = getModelProfile(perf.modelId);
            const isProfit = perf.pnl >= 0;
            const isTopRank = perf.rank <= 3;

            return (
              <tr
                key={perf.modelId}
                className={cn(
                  'border-b border-border-primary/50 transition-colors hover:bg-bg-card-hover',
                  isTopRank && 'bg-bg-card-hover/30'
                )}
              >
                {/* Rank */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    {perf.rank === 1 && <Trophy className={cn('w-4 h-4', rankConfig[perf.rank]?.color)} />}
                    {perf.rank === 2 && <Medal className={cn('w-4 h-4', rankConfig[perf.rank]?.color)} />}
                    {perf.rank === 3 && <Medal className={cn('w-4 h-4', rankConfig[perf.rank]?.color)} />}
                    <span className={cn('font-mono font-bold text-sm', rankConfig[perf.rank]?.color || 'text-text-muted')}>
                      {perf.rank}
                    </span>
                  </div>
                </td>

                {/* Model name */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: model.color }}
                    />
                    <div>
                      <span className="font-bold text-text-primary">{model.name}</span>
                      <span className="ml-2 text-xs text-text-muted">{model.provider}</span>
                    </div>
                  </div>
                </td>

                {/* Equity */}
                <td className="py-3 px-3 text-right font-mono font-bold text-text-primary">
                  {formatUSD(perf.equity)}
                </td>

                {/* PnL */}
                <td className={cn(
                  'py-3 px-3 text-right font-mono font-bold',
                  isProfit ? 'text-green-500 glow-green' : 'text-red-500 glow-red'
                )}>
                  {isProfit ? '+' : ''}{formatUSD(perf.pnl)}
                </td>

                {/* PnL % */}
                <td className={cn(
                  'py-3 px-3 text-right font-mono font-bold',
                  isProfit ? 'text-green-500' : 'text-red-500'
                )}>
                  {formatPercent(perf.pnlPercent)}
                </td>

                {/* Total trades */}
                <td className="py-3 px-3 text-right font-mono text-text-secondary">
                  {perf.totalTrades}
                </td>

                {/* Win rate */}
                <td className="py-3 px-3 text-right font-mono">
                  <span
                    className={cn(
                      'font-bold',
                      perf.winRate >= 55 ? 'text-green-500' :
                      perf.winRate >= 45 ? 'text-yellow-500' : 'text-red-500'
                    )}
                  >
                    {perf.winRate.toFixed(1)}%
                  </span>
                </td>

                {/* Sharpe ratio */}
                <td className="py-3 px-3 text-right font-mono text-text-secondary">
                  {perf.sharpeRatio.toFixed(2)}
                </td>

                {/* Sparkline */}
                <td className="py-3 px-3 text-right">
                  <Sparkline
                    data={perf.sparklineData}
                    color={model.color}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
