/**
 * ThemeToggle — switch between light and dark themes
 */

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-lg',
        'bg-bg-tertiary hover:bg-bg-card-hover border border-border-primary',
        'transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        className
      )}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            'absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300',
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          )}
        />
        <Moon
          className={cn(
            'absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300',
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          )}
        />
      </div>
    </button>
  );
}
