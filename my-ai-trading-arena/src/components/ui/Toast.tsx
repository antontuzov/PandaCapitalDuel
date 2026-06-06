/**
 * Toast component — notification popup system
 */

import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useAppStore, type Toast as ToastType } from '../../lib/store';
import { cn } from '../../lib/utils';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'border-green-500/50 text-green-500',
  error: 'border-red-500/50 text-red-500',
  warning: 'border-yellow-500/50 text-yellow-500',
  info: 'border-blue-500/50 text-blue-500',
};

function ToastItem({ toast }: { toast: ToastType }) {
  const { removeToast } = useAppStore();
  const Icon = iconMap[toast.type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-80 p-4 rounded-lg',
        'bg-bg-card border shadow-lg',
        'animate-slide-down',
        colorMap[toast.type]
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-xs text-text-secondary">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-text-muted hover:text-text-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
