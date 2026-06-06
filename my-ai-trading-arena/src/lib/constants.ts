/**
 * Application constants
 */

import type { ModelProfile, ModelId } from '../types';

/** Starting capital for each AI model */
export const STARTING_CAPITAL = 10_000;

/** Supported trading pairs */
export const TRADING_PAIRS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'BNBUSDT', 'TONUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT'] as const;

/** Model color map for Tailwind classes */
export const MODEL_COLORS: Record<ModelId, string> = {
  kimi: 'var(--color-kimi)',
  deepseek: 'var(--color-deepseek)',
  mimo: 'var(--color-mimo)',
  qwen: 'var(--color-qwen)',
  yi: 'var(--color-yi)',
  doubao: 'var(--color-doubao)',
  minimax: 'var(--color-minimax)',
};

export const MODEL_BG_CLASSES: Record<ModelId, string> = {
  kimi: 'bg-blue-500',
  deepseek: 'bg-orange-500',
  mimo: 'bg-green-500',
  qwen: 'bg-purple-500',
  yi: 'bg-yellow-500',
  doubao: 'bg-pink-500',
  minimax: 'bg-cyan-500',
};

export const MODEL_TEXT_CLASSES: Record<ModelId, string> = {
  kimi: 'text-blue-500',
  deepseek: 'text-orange-500',
  mimo: 'text-green-500',
  qwen: 'text-purple-500',
  yi: 'text-yellow-500',
  doubao: 'text-pink-500',
  minimax: 'text-cyan-500',
};

export const MODEL_BORDER_CLASSES: Record<ModelId, string> = {
  kimi: 'border-blue-500',
  deepseek: 'border-orange-500',
  mimo: 'border-green-500',
  qwen: 'border-purple-500',
  yi: 'border-yellow-500',
  doubao: 'border-pink-500',
  minimax: 'border-cyan-500',
};

/** Model profiles with full details */
export const MODEL_PROFILES: ModelProfile[] = [
  {
    id: 'kimi',
    name: 'Kimi',
    provider: 'Moonshot AI',
    color: '#3b82f6',
    colorClass: 'text-blue-500',
    description: 'Fundamental-first trader who prioritizes tokenomics and narrative analysis. Researches supply mechanics and market sentiment before executing.',
    personality: 'Fundamental Analyst & Researcher',
    characteristics: ['Researches tokenomics, unlock schedules, and token utility', 'Combines on-chain data with market sentiment', 'Tracks narratives to identify emerging trends early'],
    prefers: 'Positions backed by strong fundamentals and clear value accrual',
    avoids: 'Meme coins without clear utility, low-float tokens with VC overhang',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek',
    color: '#f97316',
    colorClass: 'text-orange-500',
    description: 'Disciplined momentum trader with a strong preference for diversification. Spreads risk across multiple assets and lets compound growth work.',
    personality: 'Diversified Momentum Trader',
    characteristics: ['Spreads risk across 4-6 assets simultaneously', 'Holds positions as long as invalidation is not triggered', 'Uses consistent 10-15x leverage across all positions'],
    prefers: 'Long exposure to multiple altcoins during confirmed trends',
    avoids: 'Frequent position adjustments, single concentrated bets',
  },
  {
    id: 'mimo',
    name: 'Mimo',
    provider: 'MiniMax',
    color: '#22c55e',
    colorClass: 'text-green-500',
    description: 'Low-latency scalper optimized for rapid execution. Holds positions for seconds to minutes, targeting small price movements with tight stops.',
    personality: 'Low-Latency Scalper',
    characteristics: ['Holds positions for seconds to minutes, not hours', 'Targets 0.2-0.8% per trade with tight 0.5% stops', 'Uses 15-20x leverage due to short duration'],
    prefers: 'High trade frequency, market microstructure signals, order book imbalances',
    avoids: 'Holding through volatility, wide stops, trend-following',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    provider: 'Alibaba',
    color: '#a855f7',
    colorClass: 'text-purple-500',
    description: 'High-conviction trader who concentrates capital on best ideas. Holds only 1-2 positions at a time with large bet sizes when confident.',
    personality: 'Focused High-Conviction Trader',
    characteristics: ['Focuses on 1-2 positions max at any given time', 'Only trades when confidence level exceeds 85%', 'Can bet 30-40% of account per trade'],
    prefers: 'Large, concentrated positions during high-conviction setups',
    avoids: 'Spreading capital thinly, trading during uncertainty',
  },
  {
    id: 'yi',
    name: 'Yi',
    provider: '01.AI',
    color: '#eab308',
    colorClass: 'text-yellow-500',
    description: 'Adaptive multi-strategy trader powered by 01.AI. Switches between momentum, mean-reversion, and breakout strategies based on regime detection.',
    personality: 'Adaptive Multi-Strategy Trader',
    characteristics: ['Detects market regime (trending vs ranging) in real-time', 'Switches strategy dynamically based on volatility regime', 'Balances between 10-18x leverage depending on conviction'],
    prefers: 'Regime-adaptive strategies, volatility breakouts, trend transitions',
    avoids: 'Sticking to one strategy regardless of conditions',
  },
  {
    id: 'doubao',
    name: 'Doubao',
    provider: 'ByteDance',
    color: '#ec4899',
    colorClass: 'text-pink-500',
    description: 'Sentiment-driven trader leveraging ByteDance social data pipelines. Front-runs narrative shifts detected from social media and news feeds.',
    personality: 'Sentiment & Narrative Front-Runner',
    characteristics: ['Processes real-time social media sentiment at scale', 'Identifies narrative shifts before they reach mainstream', 'Uses contrarian positioning against overcrowded trades'],
    prefers: 'Undervalued assets before narrative catalysts, contrarian reversal plays',
    avoids: 'Chasing already popular trades, ignoring sentiment extremes',
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    provider: 'MiniMax',
    color: '#06b6d4',
    colorClass: 'text-cyan-500',
    description: 'Versatile reasoning model combining analytical depth with adaptive execution. Excels at multi-step planning across various market conditions.',
    personality: 'Adaptive Reasoning Executor',
    characteristics: ['Performs multi-step reasoning before each trade', 'Adapts execution style to current volatility regime', 'Balances analysis depth with execution speed'],
    prefers: 'Well-researched setups with clear risk/reward, trending markets',
    avoids: 'Impulsive entries without analysis, over-leveraging on low-conviction trades',
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
  BNBUSDT: 612,
  TONUSDT: 7.25,
  ADAUSDT: 0.48,
  AVAXUSDT: 38.5,
  DOTUSDT: 7.85,
  LINKUSDT: 14.2,
};
