import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const styles = clsx(
    "px-3 py-2 rounded text-sm font-medium",
    variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
    variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
    variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
    variant === "success" && "bg-green-600 text-white",
    className
  );
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
