export function ColorPicker({
    label, value, onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600 dark:text-slate-400 min-w-20">
                {label}
            </label>
            <div className="relative">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" />
        </div>
    );
}
