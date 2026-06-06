/**
 * Sidebar — left navigation panel
 */

import { Trophy, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../lib/store';

const navItems = [
  { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
  { id: 'trades' as const, label: 'Trade Log', icon: FileText },
  { id: 'settings' as const, label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'flex flex-col h-full border-r border-border-primary',
        'bg-bg-secondary transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-52'
      )}
    >
      {/* Navigation items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2.5',
                'text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600/20 text-blue-500 border border-blue-500/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-border-primary">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
