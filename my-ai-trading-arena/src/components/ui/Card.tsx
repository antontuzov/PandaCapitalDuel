/**
 * Card component — styled container for dashboard widgets
 */

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: string;
  /** Optional action button in the header */
  action?: React.ReactNode;
  /** Compact mode with less padding */
  compact?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, action, compact, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-border-primary',
          'bg-bg-card backdrop-blur-sm',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        {title && (
          <div className={cn(
            'flex items-center justify-between',
            compact ? 'px-4 py-2.5' : 'px-5 py-3',
            'border-b border-border-primary'
          )}>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              {title}
            </h3>
            {action && <div>{action}</div>}
          </div>
        )}
        <div className={cn(compact ? 'p-3' : 'p-5')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
