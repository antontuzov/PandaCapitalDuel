/**
 * Dashboard — main real-time trading competition view
 * Features: MarketDataBar, Leaderboard, EquityCurve, Positions, Trades, OrderForm, AI Logs, Latency
 */

import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { MarketDataBar } from '../components/trading/MarketDataBar';
import { PositionsDisplay } from '../components/trading/PositionsDisplay';
import { RecentTrades } from '../components/trading/RecentTrades';
import { OrderForm } from '../components/trading/OrderForm';
import { EquityCurveChart } from '../components/charts/EquityCurveChart';
import { ModelSelector } from '../components/ai-models/ModelSelector';
import { Leaderboard } from '../components/ai-models/Leaderboard';
import { AIReasoningLogs } from '../components/ai-models/AIReasoningLogs';
import { LatencyMonitor } from '../components/ai-models/LatencyMonitor';
import { SystemPromptViewer } from '../components/ai-models/SystemPromptViewer';
import { useMarketData } from '../hooks/useMarketData';
import { useAppStore } from '../lib/store';
import { ToastContainer } from '../components/ui/Toast';

export default function Dashboard() {
  const {
    connectionStatus,
    tickers,
    modelPerformance,
    positions,
    recentTrades,
    latencyData,
    reasoningLogs,
  } = useMarketData();

  const { selectedModel, setSelectedModel, activeTab } = useAppStore();

  // Tick counter for chart refresh
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(timer);
  }, []);

  // Aggregate positions for selected model or all
  const filteredPositions = selectedModel
    ? positions[selectedModel] || []
    : Object.values(positions).flat();

  // Aggregate trades for selected model or all
  const filteredTrades = selectedModel
    ? recentTrades.filter((t) => t.modelId === selectedModel)
    : recentTrades;

  // Aggregate reasoning logs for selected model or all
  const filteredLogs = selectedModel
    ? reasoningLogs.filter((l) => l.modelId === selectedModel)
    : reasoningLogs;

  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      {/* Header */}
      <Header connectionStatus={connectionStatus} />

      {/* Main layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1800px] mx-auto">
            {/* Market Data Bar */}
            <div className="overflow-hidden">
              <MarketDataBar tickers={tickers} />
            </div>

            {/* Model Selector */}
            <div className="flex items-center justify-between">
              <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
              <div className="text-xs font-mono text-text-muted hidden md:block">
                Starting Capital: $10,000 per model
              </div>
            </div>

            {/* Conditional content based on active tab */}
            {activeTab === 'leaderboard' && (
              <>
                {/* Leaderboard + Latency (side by side on large screens) */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
                  <div className="xl:col-span-3">
                    <Card title="Leaderboard">
                      <Leaderboard performance={modelPerformance} />
                    </Card>
                  </div>
                  <div className="xl:col-span-1">
                    <Card title="Latency Monitor" compact>
                      <LatencyMonitor data={latencyData} />
                    </Card>
                  </div>
                </div>

                {/* Equity Curve */}
                <Card title="Equity Curve">
                  <EquityCurveChart selectedModel={selectedModel} tick={tick} />
                </Card>

                {/* Positions + Order Form (side by side) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                  <div className="xl:col-span-2">
                    <Card title={`Positions ${selectedModel ? `(${selectedModel.toUpperCase()})` : '(All Models)'}`}>
                      <PositionsDisplay positions={filteredPositions} />
                    </Card>
                  </div>
                  <div className="xl:col-span-1">
                    <Card title="Simulated Order Entry">
                      <OrderForm />
                    </Card>
                  </div>
                </div>

                {/* AI Reasoning Logs */}
                <Card title="AI Reasoning Logs">
                  <AIReasoningLogs logs={filteredLogs} />
                </Card>
              </>
            )}

            {activeTab === 'trades' && (
              <>
                <Card title={`Recent Trades ${selectedModel ? `(${selectedModel.toUpperCase()})` : '(All Models)'}`}>
                  <RecentTrades trades={filteredTrades} />
                </Card>

                {/* AI Reasoning also visible on trades tab */}
                <Card title="AI Reasoning Logs">
                  <AIReasoningLogs logs={filteredLogs} />
                </Card>
              </>
            )}

            {activeTab === 'prompts' && (
              <Card title="AI Trading System Prompts">
                <p className="text-sm text-text-secondary mb-4">
                  View and copy the system prompts that drive each AI model's trading behavior.
                  Each model has a tailored personality prompt on top of the base trading agent prompt,
                  HFT mode enhancement, and risk control addendum.
                </p>
                <SystemPromptViewer />
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card title="Platform Settings">
                <div className="space-y-6 py-4">
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-2">WebSocket Configuration</h4>
                    <p className="text-xs font-mono text-text-muted">
                      Status: {connectionStatus} | Mode: Simulated | Interval: 2s
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-2">Connected AI Models</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Kimi', 'DeepSeek', 'Mimo', 'Qwen', 'Yi', 'Doubao'].map((model) => (
                        <div key={model} className="p-3 rounded-lg border border-border-primary bg-bg-tertiary">
                          <div className="text-sm font-bold text-text-primary">{model}</div>
                          <div className="text-xs text-green-500 font-mono mt-1">● Active</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
