import { useEffect, useState } from "react";

export default function NotificationsPage({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);

    // Wait for animation to finish before unmount
    setTimeout(() => {
      onClose();
    }, 300); // same duration as animation
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0%); }
          }

          @keyframes slideOut {
            from { transform: translateX(0%); }
            to { transform: translateX(100%); }
          }
        `}
      </style>

      <div className="fixed inset-0 z-50 flex justify-end">
        
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={handleClose}
        ></div>

        <div
          className="relative w-96 h-full bg-white shadow-2xl p-5 overflow-y-auto"
          style={{
            animation: `${
              isClosing ? "slideOut" : "slideIn"
            } 0.3s ease-out forwards`
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              New document request created
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              Request marked as completed
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              Request expired
            </div>
          </div>
        </div>
      </div>
    </>
  );
}