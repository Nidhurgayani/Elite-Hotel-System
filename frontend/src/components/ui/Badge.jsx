import clsx from "clsx";

export default function Badge({ children, tone = "default" }) {
  return (
    <span
      className={clsx(
        "text-xs px-2 py-1 rounded",
        tone === "warning" && "bg-yellow-100 text-yellow-800",
        tone === "info" && "bg-blue-100 text-blue-800",
        tone === "success" && "bg-green-100 text-green-800",
        tone === "danger" && "bg-red-100 text-red-800",
        tone === "default" && "bg-gray-100 text-gray-800"
      )}
    >
      {children}
    </span>
  );
}
