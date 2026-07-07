import type { TabProps } from "./BackgroundSettings";

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
export function Tab({ label, active, onClick }: TabProps) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${active
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
            {label}
        </button>
    );
}
