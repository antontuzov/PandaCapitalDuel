/**
 * PositionsDisplay — live table of current open positions
 */

import { cn, formatUSD, formatPercent } from '../../lib/utils';
import type { Position } from '../../types';

interface PositionsDisplayProps {
  positions: Position[];
}

export function PositionsDisplay({ positions }: PositionsDisplayProps) {
  if (positions.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        No open positions
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-primary">
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Symbol</th>
            <th className="text-left py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Side</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Entry</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Current</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">Qty</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">PnL</th>
            <th className="text-right py-2 px-3 text-text-muted font-medium text-xs uppercase tracking-wider">PnL %</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => {
            const isProfitable = pos.unrealizedPnl >= 0;
            return (
              <tr
                key={pos.id}
                className="border-b border-border-primary/50 hover:bg-bg-card-hover transition-colors"
              >
                <td className="py-2.5 px-3 font-mono font-bold text-text-primary">
                  {pos.symbol.replace('USDT', '')}/USDT
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-bold uppercase',
                      pos.side === 'long'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    )}
                  >
                    {pos.side}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-text-secondary">
                  {formatUSD(pos.entryPrice)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-text-primary font-medium">
                  {formatUSD(pos.currentPrice)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-text-secondary">
                  {pos.quantity.toFixed(4)}
                </td>
                <td
                  className={cn(
                    'py-2.5 px-3 text-right font-mono font-bold',
                    isProfitable ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {isProfitable ? '+' : ''}{formatUSD(pos.unrealizedPnl)}
                </td>
                <td
                  className={cn(
                    'py-2.5 px-3 text-right font-mono font-bold',
                    isProfitable ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {formatPercent(pos.unrealizedPnlPercent)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
