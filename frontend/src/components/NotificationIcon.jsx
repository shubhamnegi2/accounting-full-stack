import { useEffect, useState } from "react";

export default function NotificationIcon({ count = 0, onClick }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (count >= 10) {
      setDisplayCount("9+");
    } else {
      setDisplayCount(count);
    }
  }, [count]);

  return (
    <div className="fixed bottom-6 right-6 z-50"  onClick={onClick}>
      <div className="relative">
        {/* Bell Icon */}
        <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:scale-105 transition">
          🔔
        </div>

        {/* Badge */}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {displayCount}
          </span>
        )}
      </div>
    </div>
  );
}