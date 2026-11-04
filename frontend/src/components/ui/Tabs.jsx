import clsx from "clsx";

export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={clsx(
            "px-3 py-2 rounded text-sm",
            value === t
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
