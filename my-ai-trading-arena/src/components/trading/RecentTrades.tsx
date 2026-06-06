/**
 * RecentTrades — scrollable table showing recent trade executions
 */

import { cn, formatUSD, formatRelativeTime } from '../../lib/utils';
import type { Trade } from '../../types';
import { getModelProfile } from '../../lib/constants';

interface RecentTradesProps {
  trades: Trade[];
}

export function RecentTrades({ trades }: RecentTradesProps) {
  if (trades.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        No trades yet. Waiting for AI models to execute...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-bg-card z-10">
          <tr className="border-b border-border-primary">
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Time</th>
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Model</th>
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Symbol</th>
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Side</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Price</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Qty</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">PnL</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            const model = getModelProfile(trade.modelId);
            const isProfit = trade.realizedPnl >= 0;
            return (
              <tr
                key={trade.id}
                className="border-b border-border-primary/50 hover:bg-bg-card-hover transition-colors"
              >
                <td className="py-2 px-3 font-mono text-xs text-text-muted">
                  {formatRelativeTime(trade.timestamp)}
                </td>
                <td className="py-2 px-3">
                  <span
                    className="font-bold text-sm"
                    style={{ color: model.color }}
                  >
                    {model.name}
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold text-text-primary">
                  {trade.symbol.replace('USDT', '')}/USDT
                </td>
                <td className="py-2 px-3">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-bold uppercase',
                      trade.side === 'buy'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    )}
                  >
                    {trade.side}
                  </span>
                </td>
                <td className="py-2 px-3 text-right font-mono text-text-secondary">
                  {formatUSD(trade.price)}
                </td>
                <td className="py-2 px-3 text-right font-mono text-text-secondary">
                  {trade.quantity.toFixed(4)}
                </td>
                <td
                  className={cn(
                    'py-2 px-3 text-right font-mono font-bold',
                    isProfit ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {isProfit ? '+' : ''}{formatUSD(trade.realizedPnl)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
