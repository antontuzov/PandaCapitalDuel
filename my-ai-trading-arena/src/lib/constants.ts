/**
 * Application constants
 */

import type { ModelProfile, ModelId } from '../types';

/** Starting capital for each AI model */
export const STARTING_CAPITAL = 10_000;

/** Supported trading pairs */
export const TRADING_PAIRS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'XRPUSDT'] as const;

/** Model color map for Tailwind classes */
export const MODEL_COLORS: Record<ModelId, string> = {
  kimi: 'var(--color-kimi)',
  deepseek: 'var(--color-deepseek)',
  mimo: 'var(--color-mimo)',
  qwen: 'var(--color-qwen)',
};

export const MODEL_BG_CLASSES: Record<ModelId, string> = {
  kimi: 'bg-blue-500',
  deepseek: 'bg-orange-500',
  mimo: 'bg-green-500',
  qwen: 'bg-purple-500',
};

export const MODEL_TEXT_CLASSES: Record<ModelId, string> = {
  kimi: 'text-blue-500',
  deepseek: 'text-orange-500',
  mimo: 'text-green-500',
  qwen: 'text-purple-500',
};

export const MODEL_BORDER_CLASSES: Record<ModelId, string> = {
  kimi: 'border-blue-500',
  deepseek: 'border-orange-500',
  mimo: 'border-green-500',
  qwen: 'border-purple-500',
};

/** Model profiles with full details */
export const MODEL_PROFILES: ModelProfile[] = [
  {
    id: 'kimi',
    name: 'Kimi',
    provider: 'Moonshot AI',
    color: '#3b82f6',
    colorClass: 'text-blue-500',
    description: 'Advanced reasoning model with strong long-context understanding. Excels at complex market analysis and multi-step trading strategies.',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek',
    color: '#f97316',
    colorClass: 'text-orange-500',
    description: 'High-performance model optimized for code and mathematical reasoning. Applies quantitative precision to algorithmic trading decisions.',
  },
  {
    id: 'mimo',
    name: 'Mimo',
    provider: 'MiniMax',
    color: '#22c55e',
    colorClass: 'text-green-500',
    description: 'Fast inference model with excellent real-time decision making. Ideal for high-frequency trading where speed is paramount.',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    provider: 'Alibaba',
    color: '#a855f7',
    colorClass: 'text-purple-500',
    description: 'Multimodal AI with strong financial analysis capabilities. Leverages vast training data for pattern recognition in crypto markets.',
  },
];

/** Get model profile by ID */
export function getModelProfile(id: ModelId): ModelProfile {
  return MODEL_PROFILES.find((m) => m.id === id)!;
}

/** API base URL */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/** WebSocket URL */
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001/ws';

/** Update interval for simulated data (ms) */
export const DATA_UPDATE_INTERVAL = 2000;

/** Number of recent trades to display */
export const MAX_RECENT_TRADES = 20;

/** Initial base prices for simulated markets */
export const BASE_PRICES: Record<string, number> = {
  BTCUSDT: 68500,
  ETHUSDT: 3850,
  SOLUSDT: 175,
  DOGEUSDT: 0.155,
  XRPUSDT: 0.62,
};
