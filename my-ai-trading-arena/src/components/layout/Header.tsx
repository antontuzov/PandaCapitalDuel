/**
 * Header — persistent top navigation bar
 * Shows platform name, theme toggle, clock, and connection status
 */

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';
import type { ConnectionStatus } from '../../types';

interface HeaderProps {
  connectionStatus: ConnectionStatus;
}

export function Header({ connectionStatus }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const statusColors = {
    connected: 'text-green-500',
    disconnected: 'text-red-500',
    connecting: 'text-yellow-500',
    error: 'text-red-500',
  };

  const statusLabels = {
    connected: 'LIVE',
    disconnected: 'OFFLINE',
    connecting: 'CONNECTING...',
    error: 'ERROR',
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 md:px-6 border-b border-border-primary bg-bg-card/80 backdrop-blur-md">
      {/* Left: Logo and title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-bold tracking-tight text-text-primary hidden sm:inline">
            ALPHA <span className="text-blue-500">ARENA</span>
          </span>
        </div>
        <span className="hidden md:inline text-xs text-text-muted font-mono">v1.0.0</span>
      </div>

      {/* Center: Clock */}
      <div className="font-mono text-lg text-text-secondary tracking-widest">
        {timeStr}
      </div>

      {/* Right: Connection status, theme toggle */}
      <div className="flex items-center gap-3">
        {/* Connection indicator */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            connectionStatus === 'connected' ? 'bg-green-500 animate-pulse-green' : 'bg-red-500'
          )} />
          <span className={cn(
            'text-xs font-mono font-bold tracking-wider',
            statusColors[connectionStatus]
          )}>
            {statusLabels[connectionStatus]}
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
