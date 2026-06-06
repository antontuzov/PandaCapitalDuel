/**
 * useMarketData — hook for subscribing to real-time market data via WebSocket
 */

import { useState, useEffect } from 'react';
import type {
  TickerData,
  Position,
  Trade,
  ModelPerformance,
  LatencyData,
  AIReasoningEntry,
  ConnectionStatus,
} from '../types';
import type { ModelId } from '../types';
import { wsService } from '../services/websocket';

/** Return type for the useMarketData hook */
interface UseMarketDataReturn {
  /** Connection status */
  connectionStatus: ConnectionStatus;
  /** Real-time ticker data for all trading pairs */
  tickers: TickerData[];
  /** Model performance leaderboard data */
  modelPerformance: ModelPerformance[];
  /** Current positions keyed by model ID */
  positions: Record<ModelId, Position[]>;
  /** Recent trades for all models */
  recentTrades: Trade[];
  /** Latency data for HFT monitoring */
  latencyData: LatencyData[];
  /** AI reasoning logs */
  reasoningLogs: AIReasoningEntry[];
}

/** Maximum number of recent trades and reasoning logs to keep */
const MAX_TRADES = 50;
const MAX_REASONING = 30;

/**
 * Hook to consume real-time market data
 * Connects to the WebSocket service and manages state
 */
export function useMarketData(): UseMarketDataReturn {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [modelPerformance, setModelPerformance] = useState<ModelPerformance[]>([]);
  const [positions, setPositions] = useState<Record<ModelId, Position[]>>({
    kimi: [],
    deepseek: [],
    mimo: [],
    qwen: [],
    yi: [],
    doubao: [],
    minimax: [],
  });
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);
  const [reasoningLogs, setReasoningLogs] = useState<AIReasoningEntry[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    wsService.connect();

    // Subscribe to events
    const unsubs = [
      wsService.on('status_change', (_event, data) => {
        setConnectionStatus(data as ConnectionStatus);
      }),
      wsService.on('ticker_update', (_event, data) => {
        setTickers(data as TickerData[]);
      }),
      wsService.on('model_performance', (_event, data) => {
        setModelPerformance(data as ModelPerformance[]);
      }),
      wsService.on('position_update', (_event, data) => {
        const posData = data as { modelId: ModelId; positions: Position[] };
        setPositions((prev) => ({
          ...prev,
          [posData.modelId]: posData.positions,
        }));
      }),
      wsService.on('trade_executed', (_event, data) => {
        const trade = data as Trade;
        setRecentTrades((prev) => [trade, ...prev].slice(0, MAX_TRADES));
      }),
      wsService.on('latency_update', (_event, data) => {
        setLatencyData(data as LatencyData[]);
      }),
      wsService.on('ai_reasoning', (_event, data) => {
        const entry = data as AIReasoningEntry;
        setReasoningLogs((prev) => [entry, ...prev].slice(0, MAX_REASONING));
      }),
    ];

    return () => {
      unsubs.forEach((unsub) => unsub());
      wsService.disconnect();
    };
  }, []);

  return {
    connectionStatus,
    tickers,
    modelPerformance,
    positions,
    recentTrades,
    latencyData,
    reasoningLogs,
  };
}
