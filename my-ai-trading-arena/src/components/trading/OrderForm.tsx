/**
 * OrderForm — simulated order entry panel
 */

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../lib/store';
import { MODEL_PROFILES, TRADING_PAIRS } from '../../lib/constants';
import type { ModelId } from '../../types';

export function OrderForm() {
  const { addToast } = useAppStore();
  const [selectedModel, setSelectedModel] = useState<ModelId>('kimi');
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('0.01');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const model = MODEL_PROFILES.find((m) => m.id === selectedModel);
    addToast({
      type: 'info',
      title: 'Instruction Sent',
      message: `Instructing ${model?.name} to ${side} ${quantity} ${symbol.replace('USDT', '')}. Processing...`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Model selection */}
      <div>
        <label className="block text-xs text-text-muted mb-1 uppercase tracking-wider">Model</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as ModelId)}
          className={cn(
            'w-full px-3 py-2 rounded-lg text-sm font-mono',
            'bg-bg-tertiary border border-border-primary',
            'text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            'transition-colors'
          )}
        >
          {MODEL_PROFILES.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Symbol */}
      <div>
        <label className="block text-xs text-text-muted mb-1 uppercase tracking-wider">Symbol</label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className={cn(
            'w-full px-3 py-2 rounded-lg text-sm font-mono',
            'bg-bg-tertiary border border-border-primary',
            'text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            'transition-colors'
          )}
        >
          {TRADING_PAIRS.map((pair) => (
            <option key={pair} value={pair}>
              {pair.replace('USDT', '')}/USDT
            </option>
          ))}
        </select>
      </div>

      {/* Side */}
      <div>
        <label className="block text-xs text-text-muted mb-1 uppercase tracking-wider">Side</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('buy')}
            className={cn(
              'py-2 rounded-lg text-sm font-bold uppercase transition-all',
              side === 'buy'
                ? 'bg-green-600 text-white'
                : 'bg-bg-tertiary text-text-muted hover:bg-bg-card-hover border border-border-primary'
            )}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setSide('sell')}
            className={cn(
              'py-2 rounded-lg text-sm font-bold uppercase transition-all',
              side === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-bg-tertiary text-text-muted hover:bg-bg-card-hover border border-border-primary'
            )}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-xs text-text-muted mb-1 uppercase tracking-wider">Quantity</label>
        <input
          type="number"
          step="0.001"
          min="0.001"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={cn(
            'w-full px-3 py-2 rounded-lg text-sm font-mono',
            'bg-bg-tertiary border border-border-primary',
            'text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            'transition-colors'
          )}
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant={side === 'buy' ? 'success' : 'danger'} className="w-full" size="md">
        <Send className="w-4 h-4" />
        {side === 'buy' ? 'Instruct Buy' : 'Instruct Sell'}
      </Button>
    </form>
  );
}
