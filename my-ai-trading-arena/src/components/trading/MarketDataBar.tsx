/**
 * MarketDataBar — real-time ticker data for key trading pairs
 */

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatUSD, formatPercent, formatCompact } from '../../lib/utils';
import type { TickerData } from '../../types';

interface MarketDataBarProps {
  tickers: TickerData[];
}

export function MarketDataBar({ tickers }: MarketDataBarProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-1 py-1 scrollbar-thin">
      {tickers.map((ticker) => {
        const isPositive = ticker.change24hPercent >= 0;
        return (
          <div
            key={ticker.symbol}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg',
              'bg-bg-card border border-border-primary',
              'whitespace-nowrap shrink-0',
              'transition-colors duration-200 hover:bg-bg-card-hover'
            )}
          >
            {/* Symbol */}
            <div className="font-mono text-sm font-bold text-text-primary">
              {ticker.symbol.replace('USDT', '')}/USDT
            </div>

            {/* Price */}
            <div className="font-mono text-sm text-text-primary">
              {formatUSD(ticker.price, ticker.price < 1 ? 4 : 2)}
            </div>

            {/* Change */}
            <div
              className={cn(
                'flex items-center gap-1 font-mono text-xs font-semibold',
                isPositive ? 'text-green-500 glow-green' : 'text-red-500 glow-red'
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {formatPercent(ticker.change24hPercent)}
            </div>

            {/* 24h High/Low */}
            <div className="hidden lg:flex flex-col text-[10px] text-text-muted font-mono">
              <span>H: {formatUSD(ticker.high24h, 2)}</span>
              <span>L: {formatUSD(ticker.low24h, 2)}</span>
            </div>

            {/* Volume */}
            <div className="hidden xl:block text-[10px] text-text-muted font-mono">
              Vol: ${formatCompact(ticker.volume24h)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
