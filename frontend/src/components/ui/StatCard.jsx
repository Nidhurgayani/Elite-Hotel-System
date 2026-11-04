export default function StatCard({ title, value, hint, tone = "default" }) {
  const toneMap = {
    default: "bg-white",
    success: "bg-green-50",
    info: "bg-blue-50",
    warning: "bg-yellow-50",
  };
  return (
    <div className={`p-4 border rounded ${toneMap[tone]}`}>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}
