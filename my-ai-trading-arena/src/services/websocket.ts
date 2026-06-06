/**
 * WebSocket client for real-time market data feeds
 * Falls back to simulated data when no server is available
 */

import type {
  ConnectionStatus,
} from '../types';
import type { ModelId } from '../types';
import {
  generateTickerData,
  generatePositions,
  generateTrade,
  generateModelPerformance,
  generateLatencyData,
  generateAIReasoning,
  updateModelEquity,
} from './mockData';
import { DATA_UPDATE_INTERVAL, MODEL_PROFILES } from '../lib/constants';

type WSListener = (event: string, data: unknown) => void;

/**
 * WebSocket service class
 * Manages connection and broadcasts real-time data
 */
class WebSocketService {
  private listeners: Map<string, Set<WSListener>> = new Map();
  private intervalIds: ReturnType<typeof setInterval>[] = [];
  private _status: ConnectionStatus = 'disconnected';
  private simulatedMode = true;

  /** Get current connection status */
  get status(): ConnectionStatus {
    return this._status;
  }

  /** Subscribe to an event */
  on(event: string, callback: WSListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /** Emit event to all listeners */
  private emit(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((callback) => callback(event, data));
  }

  /** Connect to WebSocket or start simulation */
  connect(url?: string) {
    this._status = 'connecting';
    this.emit('status_change', this._status);

    // Try real WebSocket first, fall back to simulation
    if (url && !this.simulatedMode) {
      try {
        const ws = new WebSocket(url);
        ws.onopen = () => {
          this._status = 'connected';
          this.emit('status_change', this._status);
        };
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.emit(message.type, message.data);
          } catch {
            // Ignore parse errors
          }
        };
        ws.onerror = () => {
          this.simulatedMode = true;
          this.startSimulation();
        };
        ws.onclose = () => {
          this._status = 'disconnected';
          this.emit('status_change', this._status);
          // Attempt reconnect after delay
          setTimeout(() => this.connect(url), 5000);
        };
      } catch {
        this.simulatedMode = true;
        this.startSimulation();
      }
    } else {
      this.startSimulation();
    }
  }

  /** Start simulated data feeds */
  private startSimulation() {
    this._status = 'connected';
    this.emit('status_change', this._status);

    // Emit initial data
    this.emit('ticker_update', generateTickerData());
    this.emit('model_performance', generateModelPerformance());

    // Fast ticker updates (every 1-2 seconds for HFT feel)
    const tickerInterval = setInterval(() => {
      this.emit('ticker_update', generateTickerData());

      // Occasionally update model equity
      if (Math.random() > 0.5) {
        const models: ModelId[] = ['kimi', 'deepseek', 'mimo', 'qwen', 'yi', 'doubao', 'minimax'];
        const model = models[Math.floor(Math.random() * models.length)];
        const delta = (Math.random() - 0.48) * 50;
        updateModelEquity(model, delta);
      }
    }, DATA_UPDATE_INTERVAL);
    this.intervalIds.push(tickerInterval);

    // Performance updates (every 5 seconds)
    const perfInterval = setInterval(() => {
      this.emit('model_performance', generateModelPerformance());
    }, 5000);
    this.intervalIds.push(perfInterval);

    // Position updates (every 3 seconds)
    const posInterval = setInterval(() => {
      MODEL_PROFILES.forEach((profile) => {
        this.emit('position_update', {
          modelId: profile.id,
          positions: generatePositions(profile.id),
        });
      });
    }, 3000);
    this.intervalIds.push(posInterval);

    // Trade execution (every 4-8 seconds)
    const tradeInterval = setInterval(() => {
      const model = MODEL_PROFILES[Math.floor(Math.random() * MODEL_PROFILES.length)];
      const trade = generateTrade(model.id);
      updateModelEquity(model.id, trade.realizedPnl);
      this.emit('trade_executed', trade);
    }, 4000 + Math.random() * 4000);
    this.intervalIds.push(tradeInterval);

    // Latency updates (every 3 seconds)
    const latencyInterval = setInterval(() => {
      this.emit('latency_update', generateLatencyData());
    }, 3000);
    this.intervalIds.push(latencyInterval);

    // AI reasoning (every 6-12 seconds)
    const reasoningInterval = setInterval(() => {
      const model = MODEL_PROFILES[Math.floor(Math.random() * MODEL_PROFILES.length)];
      this.emit('ai_reasoning', generateAIReasoning(model.id));
    }, 6000 + Math.random() * 6000);
    this.intervalIds.push(reasoningInterval);
  }

  /** Disconnect and clean up */
  disconnect() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
    this._status = 'disconnected';
    this.emit('status_change', this._status);
  }
}

/** Singleton instance */
export const wsService = new WebSocketService();
