export function Toggle({
    label, checked, onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-slate-600 dark:text-slate-400">
                {label}
            </span>
            <div
                className={`relative w-11 h-6 rounded-full transition-colors duration-200
          ${checked ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}`}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200
            ${checked ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
                    style={{ transform: checked ? "translateX(22px)" : "translateX(0)" }} />
            </div>
        </label>
    );
}
