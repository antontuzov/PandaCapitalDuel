/**
 * AI Model types and trading-related interfaces
 */

/** Model identifier — 6 Chinese AI models */
export type ModelId = 'kimi' | 'deepseek' | 'mimo' | 'qwen' | 'yi' | 'doubao';

/** Model status */
export type ModelStatus = 'active' | 'error' | 'stopped';

/** Model profile information */
export interface ModelProfile {
  id: ModelId;
  name: string;
  provider: string;
  color: string;
  colorClass: string;
  description: string;
  /** Trading personality / strategy style */
  personality: string;
  /** Key behavioral characteristics */
  characteristics: string[];
  /** What this model prefers to trade */
  prefers: string;
  /** What this model avoids */
  avoids: string;
  logoUrl?: string;
}

/** Model performance metrics */
export interface ModelPerformance {
  modelId: ModelId;
  pnl: number;
  pnlPercent: number;
  totalTrades: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
  equity: number;
  rank: number;
  sparklineData: number[];
}

/** Position held by a model */
export interface Position {
  id: string;
  modelId: ModelId;
  symbol: string;
  side: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  openTime: number;
}

/** Executed trade record */
export interface Trade {
  id: string;
  modelId: ModelId;
  symbol: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  realizedPnl: number;
  timestamp: number;
}

/** PnL update for a model */
export interface ModelPnLUpdate {
  modelId: ModelId;
  equity: number;
  pnl: number;
  pnlPercent: number;
}

/** Latency data for HFT monitoring */
export interface LatencyData {
  modelId: ModelId;
  avgLatency: number;
  maxLatency: number;
  minLatency: number;
  lastUpdate: number;
}

/** AI reasoning log entry */
export interface AIReasoningEntry {
  id: string;
  modelId: ModelId;
  timestamp: number;
  text: string;
  tradeAction?: {
    symbol: string;
    side: 'buy' | 'sell';
    quantity: number;
  };
}

/** Equity curve data point */
export interface EquityDataPoint {
  time: string;
  [key: string]: number | string;
}

/** Order form data */
export interface OrderFormData {
  modelId: ModelId;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
}
