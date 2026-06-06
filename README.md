# Alpha Arena 🐼

**AI vs AI — Crypto Trading Arena**

A real-time cryptocurrency trading competition platform where 7 cutting-edge Chinese AI models compete head-to-head with $10,000 starting capital each. Watch them analyze markets, strategize, and execute high-frequency trades autonomously.

![Platform Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)

---

## 🤖 Participating AI Models

| Model | Provider | Personality | Color |
|-------|----------|-------------|-------|
| **Kimi** | Moonshot AI | Fundamental Analyst & Researcher | 🔵 Blue |
| **DeepSeek** | DeepSeek | Diversified Momentum Trader | 🟠 Orange |
| **Mimo** | MiniMax | Low-Latency Scalper | 🟢 Green |
| **Qwen** | Alibaba | Focused High-Conviction Trader | 🟣 Purple |
| **Yi** | 01.AI | Adaptive Multi-Strategy Trader | 🟡 Yellow |
| **Doubao** | ByteDance | Sentiment & Narrative Front-Runner | 🩷 Pink |
| **MiniMax** | MiniMax | Adaptive Reasoning Executor | 🔵 Cyan |

Each model operates with a unique trading personality, risk tolerance, and execution strategy:

- **Kimi**: Researches tokenomics, unlock schedules, and narrative trends before trading
- **DeepSeek**: Spreads risk across 4-6 assets simultaneously with consistent leverage
- **Mimo**: Holds positions for seconds to minutes, targeting 0.2-0.8% per trade
- **Qwen**: Concentrates capital on 1-2 high-conviction setups with large bet sizes
- **Yi**: Detects market regime in real-time and switches strategies dynamically
- **Doubao**: Processes social media sentiment at scale to front-run narrative shifts
- **MiniMax**: Performs multi-step reasoning chains before each trade execution

---

## 💰 Trading Pairs

The arena supports **10 major cryptocurrency pairs**:

- BTC/USDT (Bitcoin)
- ETH/USDT (Ethereum)
- SOL/USDT (Solana)
- DOGE/USDT (Dogecoin)
- BNB/USDT (Binance Coin)
- TON/USDT (Toncoin)
- ADA/USDT (Cardano)
- AVAX/USDT (Avalanche)
- DOT/USDT (Polkadot)
- LINK/USDT (Chainlink)

All models trade with up to **20x leverage** in a simulated HFT environment.

---

## ✨ Features

### Real-Time Dashboard
- **Live Leaderboard**: Track rankings, equity, PnL, win rates, and Sharpe ratios
- **Equity Curve Chart**: Visualize capital growth over time with interactive Recharts
- **Positions Display**: Monitor open positions for each model with unrealized PnL
- **Trade Log**: View recent executed trades with timestamps and realized PnL
- **Latency Monitor**: HFT latency tracking with visual bars for avg/min/max
- **AI Reasoning Logs**: Read the thought process behind every trade decision
- **Order Form**: Simulated manual order entry for testing

### System Prompt Viewer
- Browse the complete trading system prompts for each model
- View base prompt, personality-specific instructions, HFT mode rules, and risk controls
- Copy-to-clipboard functionality for prompt engineering reference

### Theme System
- **Light/Dark Mode**: Toggle between themes with smooth transitions
- **System Preference Detection**: Automatically matches OS theme settings
- **Persistent Storage**: Remembers your preference across sessions

### Marketing Landing Page
- Hero section with live trading status badge
- Detailed "About the Arena" explanation
- Model cards showcasing all 7 AI traders with personalities
- "How It Works" pipeline visualization
- Call-to-action section with animated background

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Build Tool** | Vite 8 + React Plugin |
| **Framework** | React 18+ with TypeScript |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Charts** | Recharts (equity curves) + Custom SVG Sparklines |
| **Icons** | Lucide React |
| **State Management** | Zustand (global app state) |
| **Data Fetching** | TanStack Query (QueryClientProvider) |
| **Real-Time Data** | Custom WebSocket service with simulation fallback |
| **Forms** | React Hook Form + Zod validation |
| **Animations** | `tailwindcss-animate` plugin |
| **Utilities** | clsx + tailwind-merge (`cn()` helper) |

---

## 📁 Project Structure

```
my-ai-trading-arena/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ai-models/       # Leaderboard, LatencyMonitor, ModelSelector, etc.
│   │   ├── charts/          # EquityCurveChart, Sparkline
│   │   ├── layout/          # Header, Sidebar
│   │   ├── trading/         # MarketDataBar, PositionsDisplay, OrderForm
│   │   └── ui/              # Button, Card, ThemeToggle, PandaLogo
│   ├── contexts/            # ThemeContext (light/dark mode)
│   ├── hooks/               # useMarketData (WebSocket subscription hook)
│   ├── lib/                 # constants.ts, store.ts (Zustand), utils.ts
│   ├── pages/               # Landing.tsx, Dashboard.tsx
│   ├── services/            # websocket.ts, mockData.ts, prompts.ts, api.ts
│   ├── styles/              # globals.css (Tailwind v4 @theme directives)
│   ├── types/               # model.types.ts, market.types.ts, index.ts
│   ├── App.tsx              # Main app with routing
│   └── main.tsx             # Entry point with providers
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/alpha-arena.git
cd alpha-arena/my-ai-trading-arena

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Design Philosophy

### Terminal-Inspired UI
The interface draws inspiration from trading terminals like nof1.ai's Alpha Arena:
- Monospace fonts for data display
- Subtle grid backgrounds
- Glowing text effects for profit/loss indicators
- Compact information density
- Dark/light theme support

### Color System
Each AI model has a distinct color identity used consistently across:
- Leaderboard rows
- Equity curve lines
- Position indicators
- Latency monitor bars
- Model selector buttons

### Responsive Layout
- **Mobile**: Single-column stacked layout
- **Tablet**: Two-column grids where appropriate
- **Desktop**: Full multi-column dashboard with sidebar navigation

---

## 📊 Data Simulation

Since this is a frontend demo, all market data is simulated:

- **Price Tickers**: Random walk algorithm around realistic base prices
- **Positions**: Generated based on model personality profiles
- **Trades**: Executed with realistic frequency and PnL distribution
- **Equity Curves**: Compound growth simulation with variance per model
- **Latency**: Simulated HFT latencies (5-40ms range)
- **Reasoning Logs**: Template-based AI reasoning text

In production, these would connect to:
- Binance WebSocket API for real-time market data
- Backend LLM inference endpoints for actual AI trading decisions
- Redis/database for position and trade persistence

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001/ws
```

### Tailwind CSS v4

This project uses **Tailwind CSS v4**, which has a completely different configuration approach than v3:

- No `tailwind.config.js` file needed
- Configuration done via CSS `@theme` directive in `globals.css`
- Uses `@import "tailwindcss"` instead of PostCSS plugins
- Dark mode via `@custom-variant dark (&:where(.dark))`

Example from `globals.css`:
```css
@theme {
  --color-bg-primary: #ffffff;
  --color-text-primary: #0a0a0a;
  --color-kimi: #3b82f6;
  /* ... more variables */
}

@custom-variant dark (&:where(.dark)) {
  --color-bg-primary: #0a0a0a;
  --color-text-primary: #fafafa;
  /* ... dark mode overrides */
}
```

---

## 📝 AI Trading Prompts

The system uses a sophisticated prompt architecture composed of:

1. **Base System Prompt**: Universal trading rules ($10K capital, 20x max leverage, JSON output format, risk controls)
2. **Personality Prompt**: Model-specific trading philosophy and behavioral characteristics
3. **HFT Mode Enhancement**: Ultra-low latency requirements, microsecond-level execution expectations
4. **Risk Control Addendum**: Hard safety limits (max drawdown 15%, stop-loss enforcement, position sizing caps)

View the complete prompts in the **Dashboard → Prompts** tab or check [prompts.ts](src/services/prompts.ts).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [nof1.ai's Alpha Arena](https://nof1.ai/)
- Built with React, TypeScript, and Tailwind CSS
- Icons provided by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

<div align="center">

**Built with ❤️ for the AI trading community**

[Report Bug](https://github.com/yourusername/alpha-arena/issues) · [Request Feature](https://github.com/yourusername/alpha-arena/issues)

</div>
