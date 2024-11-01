import React from 'react';
import { motion } from 'framer-motion';

interface DialProps {
  value: number; // 0-100
}

const DialComponent: React.FC<DialProps> = ({ value }) => {
  // Ensure value is between 0-100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Calculate needle rotation (-90 to 90 degrees)
  const needleRotation = -90 + (normalizedValue * 180) / 100;

  return (
    <div className="w-[500px] relative">
      <svg viewBox="0 0 500 300">
        <defs>
          {/* Define gradient for better color transition */}
          <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y1="0%">
            <stop offset="0%" style={{ stopColor: '#22c55e' }} />
            <stop offset="33%" style={{ stopColor: '#22c55e' }} />
            <stop offset="33%" style={{ stopColor: '#eab308' }} />
            <stop offset="67%" style={{ stopColor: '#eab308' }} />
            <stop offset="67%" style={{ stopColor: '#ef4444' }} />
            <stop offset="100%" style={{ stopColor: '#ef4444' }} />
          </linearGradient>

          {/* Define paths for the labels */}
          <path id="lowPath" d="M50 220 A200 200 0 0 1 183 220" />
          <path id="moderatePath" d="M184 210 A200 200 0 0 1 316 210" />
          <path id="highPath" d="M317 220 A200 200 0 0 1 450 220" />
        </defs>

        {/* Main colored semicircle */}
        <path
          d="M50 250 A200 200 0 0 1 450 250"
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth="40"
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {Array.from({ length: 21 }).map((_, i) => {
          const angle = -180 + (i * 180) / 20;
          const radian = (angle * Math.PI) / 180;
          const x1 = 250 + 180 * Math.cos(radian);
          const y1 = 250 + 180 * Math.sin(radian);
          const x2 = 250 + 160 * Math.cos(radian);
          const y2 = 250 + 160 * Math.sin(radian);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}

        {/* Curved Labels */}
        {/* <text className="text-lg font-bold" fill="black">
          <textPath href="#lowPath" startOffset="20%" textAnchor="middle">
            LOW
          </textPath>
        </text>
        <text className="text-lg font-bold" fill="black">
          <textPath href="#moderatePath" startOffset="50%" textAnchor="middle">
            MODERATE
          </textPath>
        </text>
        <text className="text-lg font-bold" fill="black">
          <textPath href="#highPath" startOffset="80%" textAnchor="middle">
            HIGH
          </textPath>
        </text> */}

        {/* Center text "DIABETES RISK" on curved path */}
        <path
          id="textPath"
          d="M100 280 A180 180 0 0 1 400 280"
          fill="none"
          stroke="none"
        />
        {/* <text className="text-lg font-bold">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            DIABETES RISK
          </textPath>
        </text> */}

        {/* Needle with shadow */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: needleRotation }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
          style={{ originX: "250px", originY: "250px" }}
        >
          {/* Needle shadow */}
          <line
            x1="250"
            y1="250"
            x2="250"
            y2="90"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="6"
            transform="translate(2, 2)"
          />
          {/* Needle */}
          <line
            x1="250"
            y1="250"
            x2="250"
            y2="90"
            stroke="#dc2626"
            strokeWidth="4"
          />
          {/* Center circle shadow */}
          <circle
            cx="252"
            cy="252"
            r="15"
            fill="rgba(0,0,0,0.2)"
          />
          {/* Center circle */}
          <circle
            cx="250"
            cy="250"
            r="15"
            fill="#dc2626"
          />
        </motion.g>

        {/* Value display */}
        {/* <text 
          x="250" 
          y="200" 
          textAnchor="middle" 
          className="text-2xl font-bold"
          fill="black"
        >
          {normalizedValue}%
        </text> */}
      </svg>
    </div>
  );
};

export default DialComponent;