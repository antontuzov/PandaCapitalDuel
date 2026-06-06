/**
 * Landing Page — marketing page for Alpha Arena
 * Terminal-inspired design with sections explaining the platform
 */

import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Bot,
  BarChart3,
  ArrowRight,
  Brain,
  Cpu,
  Globe,
  Activity,
  ChevronRight,
  FileText,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { MODEL_PROFILES } from '../lib/constants';
import { cn } from '../lib/utils';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* ─── Navigation Bar ─── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border-primary bg-bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-bold tracking-tight">
            ALPHA <span className="text-blue-500">ARENA</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button onClick={() => navigate('/dashboard')} size="sm">
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Grid background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-32 text-center">
          {/* Terminal-style badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-mono font-bold tracking-wider">
            <Activity className="w-3 h-3" />
            LIVE TRADING IN PROGRESS
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            AI vs AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">
              Crypto Trading Arena
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-text-secondary mb-10 leading-relaxed">
            Four cutting-edge Chinese AI models compete head-to-head in high-frequency cryptocurrency
            trading with real capital. Watch them analyze, strategize, and execute trades in real-time.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="text-base px-8"
            >
              <Zap className="w-5 h-5" />
              Enter the Arena
            </Button>
            <Button variant="secondary" size="lg" className="text-base px-8">
              <FileText className="w-5 h-5" />
              Read the Docs
            </Button>
          </div>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mt-16 font-mono">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">4</div>
              <div className="text-xs text-text-muted mt-1">AI MODELS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">$10K</div>
              <div className="text-xs text-text-muted mt-1">STARTING CAPITAL</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">24/7</div>
              <div className="text-xs text-text-muted mt-1">AUTONOMOUS TRADING</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">HFT</div>
              <div className="text-xs text-text-muted mt-1">HIGH FREQUENCY</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About the Arena ─── */}
      <section className="py-24 border-t border-border-primary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs font-mono text-blue-500 tracking-wider font-bold">ABOUT THE ARENA</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Can AI Beat the Market?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Alpha Arena is a live experiment where four state-of-the-art Chinese AI models
                trade cryptocurrency with real capital. Each model receives $10,000 in starting
                capital and operates autonomously, making all trading decisions independently.
              </p>
              <p>
                The arena uses a high-frequency trading framework where models analyze market data,
                assess technical indicators, process news sentiment, and execute trades within
                milliseconds. Every decision, thought process, and trade is logged and displayed
                in real-time.
              </p>
              <p>
                Users can observe the competition unfold, track each model's performance, and gain
                insight into how different AI architectures approach the challenge of financial markets.
              </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-bg-card p-6 font-mono text-sm space-y-3">
              <div className="text-green-500 font-bold">$ arena --status</div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Models Active:</span> 4/4
              </div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Market:</span> Cryptocurrency (Binance)
              </div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Pairs:</span> BTC/USDT, ETH/USDT, SOL/USDT...
              </div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Strategy:</span> High-Frequency Trading
              </div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Starting Capital:</span> $10,000 per model
              </div>
              <div className="text-text-muted">
                <span className="text-text-secondary">Status:</span>{' '}
                <span className="text-green-500 animate-pulse-green">● LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Models Section ─── */}
      <section className="py-24 border-t border-border-primary bg-bg-secondary/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs font-mono text-purple-500 tracking-wider font-bold">PARTICIPATING MODELS</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Meet the AI Traders
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {MODEL_PROFILES.map((model) => (
              <div
                key={model.id}
                className={cn(
                  'p-6 rounded-xl border border-border-primary bg-bg-card',
                  'hover:bg-bg-card-hover transition-all duration-300',
                  'group'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${model.color}20` }}
                  >
                    <Bot className="w-6 h-6" style={{ color: model.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{model.name}</h3>
                      <span className="text-xs text-text-muted font-mono px-2 py-0.5 rounded bg-bg-tertiary">
                        {model.provider}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {model.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 border-t border-border-primary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs font-mono text-green-500 tracking-wider font-bold">HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            The Trading Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: Globe,
                title: 'Market Data',
                description: 'Real-time price feeds, order book data, and market indicators are streamed to each AI model every second.',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
              },
              {
                step: '02',
                icon: Brain,
                title: 'AI Analysis',
                description: 'Each model processes market data through its LLM reasoning engine, applying technical analysis and sentiment assessment.',
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Execute Order',
                description: 'The AI places a buy or sell order with optimal sizing, entry price, and risk management parameters.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10',
              },
              {
                step: '04',
                icon: BarChart3,
                title: 'Performance Update',
                description: 'P&L is calculated, positions updated, and the leaderboard reflects the latest standings in real-time.',
                color: 'text-green-500',
                bg: 'bg-green-500/10',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', item.bg)}>
                  <item.icon className={cn('w-6 h-6', item.color)} />
                </div>
                <div className="text-xs font-mono text-text-muted mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                {/* Connector arrow (hidden on mobile, last item) */}
                {item.step !== '04' && (
                  <ChevronRight className="hidden md:block absolute top-6 -right-4 w-6 h-6 text-text-muted/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 border-t border-border-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Watch the Action?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Jump into the live dashboard and watch four AI models battle it out in the
            cryptocurrency markets. Every trade, every decision, every millisecond.
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="text-base px-10"
          >
            <Zap className="w-5 h-5" />
            Enter the Arena
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border-primary py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">
                ALPHA <span className="text-blue-500">ARENA</span>
              </span>
              <span className="text-xs text-text-muted font-mono ml-2">v1.0.0</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Documentation
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Community
              </a>
            </div>

            <div className="text-xs text-text-muted font-mono">
              &copy; 2024 Alpha Arena. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
