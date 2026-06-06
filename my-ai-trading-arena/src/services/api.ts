/**
 * API Client — Axios-based HTTP client for REST API calls
 */

import axios from 'axios';
import { API_BASE_URL } from '../lib/constants';

/** Create axios instance with defaults */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Response interceptor for error handling */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/** API endpoints */
export const apiClient = {
  /** Get historical PnL data */
  getHistoricalPnL: (modelId: string, timeframe: string) =>
    api.get(`/api/pnl/${modelId}?timeframe=${timeframe}`),

  /** Get model details */
  getModelDetails: (modelId: string) =>
    api.get(`/api/models/${modelId}`),

  /** Submit an order instruction */
  submitOrder: (data: { modelId: string; symbol: string; side: string; quantity: number }) =>
    api.post('/api/orders', data),

  /** Get trade history */
  getTradeHistory: (modelId?: string) =>
    api.get('/api/trades', { params: modelId ? { modelId } : {} }),

  /** Health check */
  healthCheck: () => api.get('/api/health'),
};

export default api;
