/**
 * Market data types for cryptocurrency trading
 */

import type { Position, Trade, ModelPnLUpdate } from './model.types';

/** Supported trading pairs */
export type TradingPair = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | 'DOGEUSDT' | 'BNBUSDT';

/** Real-time price ticker data */
export interface TickerData {
  symbol: TradingPair;
  price: number;
  change24h: number;
  change24hPercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  timestamp: number;
}

/** Candlestick data point for charts */
export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Order book entry */
export interface OrderBookEntry {
  price: number;
  quantity: number;
}

/** WebSocket message types */
export type WSMessageType = 
  | 'ticker_update'
  | 'position_update'
  | 'trade_executed'
  | 'pnl_update'
  | 'model_status'
  | 'ai_reasoning'
  | 'latency_update';

/** Base WebSocket message */
export interface WSMessage {
  type: WSMessageType;
  data: unknown;
  timestamp: number;
}

/** Ticker update message */
export interface TickerUpdateMessage extends WSMessage {
  type: 'ticker_update';
  data: TickerData[];
}

/** Position update message */
export interface PositionUpdateMessage extends WSMessage {
  type: 'position_update';
  data: Position[];
}

/** Trade execution message */
export interface TradeExecutedMessage extends WSMessage {
  type: 'trade_executed';
  data: Trade;
}

/** PnL update message */
export interface PnLUpdateMessage extends WSMessage {
  type: 'pnl_update';
  data: ModelPnLUpdate[];
}

/** Connection status */
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

/** Timeframe for charts */
export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
