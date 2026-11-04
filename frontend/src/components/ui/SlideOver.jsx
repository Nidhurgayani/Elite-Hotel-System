import { useEffect } from "react";

export default function SlideOver({ children, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Slide Panel */}
      <div className="ml-auto w-full max-w-md bg-white shadow-xl h-full overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}