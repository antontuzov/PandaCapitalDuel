/**
 * Mock data generator for simulating real-time market data
 * Used when no backend server is available
 */

import type {
  TickerData,
  Position,
  Trade,
  ModelPerformance,
  LatencyData,
  AIReasoningEntry,
  EquityDataPoint,
  TradingPair,
} from '../types';
import type { ModelId } from '../types';
import { BASE_PRICES, STARTING_CAPITAL, MODEL_PROFILES } from '../lib/constants';
import { generateId } from '../lib/utils';

// ─── State for simulated data ───────────────────────────────

let currentPrices: Record<string, number> = { ...BASE_PRICES };
const modelEquity: Record<ModelId, number> = {
  kimi: STARTING_CAPITAL,
  deepseek: STARTING_CAPITAL,
  mimo: STARTING_CAPITAL,
  qwen: STARTING_CAPITAL,
};

/** Simulate price movement with random walk */
function simulatePrice(symbol: string): number {
  const base = currentPrices[symbol] || BASE_PRICES[symbol];
  const volatility = symbol === 'BTCUSDT' ? 0.002 : symbol === 'ETHUSDT' ? 0.003 : 0.005;
  const change = (Math.random() - 0.48) * volatility * base; // Slight upward bias
  currentPrices[symbol] = Math.max(base * 0.9, base + change);
  return currentPrices[symbol];
}

/** Generate realistic ticker data for all trading pairs */
export function generateTickerData(): TickerData[] {
  const pairs: TradingPair[] = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'XRPUSDT'];
  return pairs.map((symbol) => {
    const price = simulatePrice(symbol);
    const basePrice = BASE_PRICES[symbol];
    const change24h = price - basePrice * (1 + (Math.random() - 0.5) * 0.02);
    const change24hPercent = (change24h / basePrice) * 100;
    return {
      symbol,
      price,
      change24h,
      change24hPercent,
      high24h: price * (1 + Math.random() * 0.03),
      low24h: price * (1 - Math.random() * 0.03),
      volume24h: Math.random() * 1_000_000_000 + 500_000_000,
      timestamp: Date.now(),
    };
  });
}

/** Generate simulated positions for a model */
export function generatePositions(modelId: ModelId): Position[] {
  const numPositions = Math.floor(Math.random() * 3) + 1;
  const pairs = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
  const positions: Position[] = [];

  for (let i = 0; i < numPositions; i++) {
    const symbol = pairs[i % pairs.length];
    const currentPrice = currentPrices[symbol] || BASE_PRICES[symbol];
    const side = Math.random() > 0.5 ? 'long' : 'short';
    const entryPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    const quantity = (Math.random() * 2 + 0.1) * (symbol === 'BTCUSDT' ? 0.01 : symbol === 'ETHUSDT' ? 0.1 : 1);
    const unrealizedPnl = side === 'long'
      ? (currentPrice - entryPrice) * quantity
      : (entryPrice - currentPrice) * quantity;

    positions.push({
      id: generateId(),
      modelId,
      symbol,
      side,
      entryPrice,
      currentPrice,
      quantity,
      unrealizedPnl,
      unrealizedPnlPercent: (unrealizedPnl / (entryPrice * quantity)) * 100,
      openTime: Date.now() - Math.random() * 3600000,
    });
  }
  return positions;
}

/** Generate a simulated trade */
export function generateTrade(modelId: ModelId): Trade {
  const pairs = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'XRPUSDT'];
  const symbol = pairs[Math.floor(Math.random() * pairs.length)];
  const price = currentPrices[symbol] || BASE_PRICES[symbol];
  const side: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';
  const quantity = (Math.random() * 2 + 0.1) * (symbol === 'BTCUSDT' ? 0.01 : symbol === 'ETHUSDT' ? 0.1 : 1);

  return {
    id: generateId(),
    modelId,
    symbol,
    side,
    price,
    quantity,
    realizedPnl: (Math.random() - 0.4) * 100, // Slight positive bias
    timestamp: Date.now(),
  };
}

/** Generate performance data for all models */
export function generateModelPerformance(): ModelPerformance[] {
  const profiles = MODEL_PROFILES.map((profile) => {
    const equity = modelEquity[profile.id];
    const pnl = equity - STARTING_CAPITAL;
    const pnlPercent = (pnl / STARTING_CAPITAL) * 100;

    // Generate sparkline data (last 20 points)
    const sparklineData = Array.from({ length: 20 }, (_, i) => {
      const base = STARTING_CAPITAL + (i / 20) * pnl;
      return base + (Math.random() - 0.5) * Math.abs(pnl) * 0.3;
    });

    return {
      modelId: profile.id,
      equity,
      pnl,
      pnlPercent,
      totalTrades: Math.floor(Math.random() * 500) + 100,
      winRate: 45 + Math.random() * 15,
      sharpeRatio: 0.5 + Math.random() * 2.5,
      maxDrawdown: -(Math.random() * 8 + 1),
      rank: 0, // Will be set after sorting
      sparklineData,
    };
  });

  // Sort by equity descending to set ranks
  profiles.sort((a, b) => b.equity - a.equity);
  profiles.forEach((p, i) => { p.rank = i + 1; });

  return profiles;
}

/** Generate latency data for HFT monitoring */
export function generateLatencyData(): LatencyData[] {
  return MODEL_PROFILES.map((profile) => ({
    modelId: profile.id,
    avgLatency: 5 + Math.random() * 25,
    maxLatency: 20 + Math.random() * 50,
    minLatency: 2 + Math.random() * 5,
    lastUpdate: Date.now(),
  }));
}

/** AI reasoning text templates */
const REASONING_TEMPLATES: Record<ModelId, string[]> = {
  kimi: [
    'Analyzing BTC 1-minute RSI divergence. Price showing bullish momentum with volume confirmation. Entering long position.',
    'ETH/USDT forming a descending wedge on the 5-minute chart. Expecting breakout to the upside. Setting limit order.',
    'Cross-referencing multiple timeframe analysis. 4H trend is bearish but 1H showing reversal signal. Proceeding with caution.',
    'Detected unusual order book imbalance on SOL. Large bid wall forming at support level. Going long with tight stop-loss.',
    'Market sentiment shift detected through social media analysis. Risk-off environment building. Reducing position sizes.',
  ],
  deepseek: [
    'Quantitative model triggered: mean reversion signal on BTC/USDT at 2-sigma deviation from VWAP. Executing reversion trade.',
    'Statistical arbitrage opportunity detected between ETH and SOL. Correlation breakdown creating spread trade entry.',
    'Backtesting results show 72% win rate on current pattern. Historical analog suggests 3.2% upside in next 15 minutes.',
    'Applying Monte Carlo simulation to current portfolio. Risk-adjusted returns favor adding to BTC long position.',
    'Machine learning ensemble predicts 65% probability of downward move in next hour. Hedging with short position.',
  ],
  mimo: [
    'Ultra-fast momentum signal detected. BTC breaking above micro-resistance with surge in taker buy volume. Entering immediately.',
    'Latency arbitrage: order book depth thinning on ask side. Placing aggressive buy order before liquidity refill.',
    'Microstructure analysis shows informed buying on ETH. Stealth accumulation pattern detected. Following smart money.',
    'Cross-exchange price discrepancy detected. BTC trading 0.3% lower on this venue. Scaling in.',
    'Volatility expansion imminent based on Bollinger Band squeeze. Direction unclear, entering straddle position.',
  ],
  qwen: [
    'Multimodal analysis: chart pattern combined with news sentiment indicates bullish continuation for BTC. High conviction long.',
    'Natural language processing of Fed minutes suggests dovish pivot. Risk assets including crypto likely to rally. Increasing ETH exposure.',
    'Pattern recognition identified cup-and-handle formation on 1H SOL chart. Target price implies 5% upside from current levels.',
    'Analyzing whale wallet movements on-chain. Large BTC accumulation detected. Bullish signal for near-term price action.',
    'Combining technical indicators with macro data. CPI release tomorrow may create volatility. Positioning for upside surprise.',
  ],
};

/** Generate AI reasoning log entry */
export function generateAIReasoning(modelId: ModelId): AIReasoningEntry {
  const templates = REASONING_TEMPLATES[modelId];
  const text = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: generateId(),
    modelId,
    timestamp: Date.now(),
    text,
    tradeAction: {
      symbol: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'][Math.floor(Math.random() * 3)],
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      quantity: Math.random() * 2 + 0.1,
    },
  };
}

/** Generate equity curve historical data */
export function generateEquityCurve(): EquityDataPoint[] {
  const points: EquityDataPoint[] = [];
  const now = Date.now();
  const hours = 24;

  const equityTracks: Record<ModelId, number> = {
    kimi: STARTING_CAPITAL,
    deepseek: STARTING_CAPITAL,
    mimo: STARTING_CAPITAL,
    qwen: STARTING_CAPITAL,
  };

  for (let i = hours; i >= 0; i--) {
    const time = new Date(now - i * 3600000).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    (Object.keys(equityTracks) as ModelId[]).forEach((modelId) => {
      const change = (Math.random() - 0.45) * 200; // Slight positive bias
      equityTracks[modelId] = Math.max(5000, equityTracks[modelId] + change);
    });

    points.push({
      time,
      kimi: equityTracks.kimi,
      deepseek: equityTracks.deepseek,
      mimo: equityTracks.mimo,
      qwen: equityTracks.qwen,
    });
  }

  return points;
}

/** Update model equity (called on each tick) */
export function updateModelEquity(modelId: ModelId, delta: number) {
  modelEquity[modelId] = Math.max(1000, modelEquity[modelId] + delta);
}
