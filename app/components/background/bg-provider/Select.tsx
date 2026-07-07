export function Select<T extends string>({
    label, value, options, onChange,
}: {
    label: string;
    value: T;
    options: { value: T; label: string; }[];
    onChange: (value: T) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm text-slate-600 dark:text-slate-400">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 
          dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
