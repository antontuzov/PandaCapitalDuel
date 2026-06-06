/**
 * Global app state managed by Zustand
 */

import { create } from 'zustand';
import type { ModelId } from '../types';

interface AppState {
  /** Currently selected model (null = all models) */
  selectedModel: ModelId | null;
  /** Set selected model */
  setSelectedModel: (model: ModelId | null) => void;

  /** Toast notifications */
  toasts: Toast[];
  /** Add a toast */
  addToast: (toast: Omit<Toast, 'id'>) => void;
  /** Remove a toast */
  removeToast: (id: string) => void;

  /** Active navigation tab */
  activeTab: 'leaderboard' | 'trades' | 'prompts' | 'settings';
  /** Set active tab */
  setActiveTab: (tab: 'leaderboard' | 'trades' | 'prompts' | 'settings') => void;

  /** Sidebar collapsed state */
  sidebarCollapsed: boolean;
  /** Toggle sidebar */
  toggleSidebar: () => void;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

let toastCounter = 0;

export const useAppStore = create<AppState>((set) => ({
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),

  toasts: [],
  addToast: (toast) => {
    const id = `toast-${++toastCounter}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  activeTab: 'leaderboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
