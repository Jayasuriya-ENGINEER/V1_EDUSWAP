import { useEffect, useState } from "react";

export default function Speedometer({ value, maxValue = 20 }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((animatedValue / maxValue) * 100, 100);
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {/* Speedometer Arc */}
      <svg
        viewBox="0 0 200 120"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Background Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Colored Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 - (251.2 * percentage) / 100}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${rotation} 100 100)`}
          style={{
            transition: "transform 1s ease-in-out",
          }}
        />

        {/* Center Circle */}
        <circle cx="100" cy="100" r="8" fill="#374151" />
      </svg>

      {/* Value Display */}
      <div className="absolute bottom-2 text-center">
        <p className="text-3xl font-bold text-gray-900">
          {animatedValue.toFixed(1)}
        </p>
        <p className="text-xs text-gray-500">hrs/week</p>
      </div>
    </div>
  );
}
