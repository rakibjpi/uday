import React, { useState, useCallback } from "react";
import type { TabItem } from "../types";

// ============================================================================
// TABS COMPONENT
// ============================================================================

interface TabsProps {
  items: TabItem[];
  activeTab?: string | null;
  onTabChange?: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeTab, onTabChange }) => {
  const [localActiveTab, setLocalActiveTab] = useState(
    activeTab || items[0]?.id,
  );

  const handleTabClick = useCallback(
    (tabId: string, disabled?: boolean) => {
      if (disabled) return;
      setLocalActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [onTabChange],
  );

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="flex space-x-8 -mb-px">
        {items.map((tab) => {
          const isActive = localActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled}
              className={`relative flex items-center gap-2 px-1 py-4 text-sm font-medium transition-colors ${
                tab.disabled
                  ? "text-slate-400 cursor-not-allowed"
                  : isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export type { TabsProps };
