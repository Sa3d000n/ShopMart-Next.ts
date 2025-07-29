import React, { useState } from "react";
import { Interface } from "readline";
const divContainer = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starsContainer = {
  display: "flex",
  gap: "4px",
};

interface StarsRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  onRatingSet?: Function;
  numberOfVotes?: number | undefined;
}

export default function StarsRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  numberOfVotes = undefined,
  onRatingSet,
}: StarsRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const handleRating = (i: number) => {
    setRating(i + 1);
    onRatingSet(i + 1);
  };
  const textStyle = {
    margin: "0px",
    lineHeight: "1",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={divContainer} className={className}>
      <div style={starsContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            // onHoverIn={() => setTempRating(i + 1)}
            // onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      {numberOfVotes !== undefined ? (
        <p className="text-stone-500 pb-1">({numberOfVotes})</p>
      ) : (
        <p style={textStyle}>
          {messages.length == maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      )}
    </div>
  );
}
interface StarProps {
  onRate: Function;
  full: boolean;
  onHoverOut?: Function;
  onHoverIn?: Function;
  color: string;
  size: number;
}
function Star({ onRate, full, onHoverOut, onHoverIn, color, size }: StarProps) {
  const starStyle = {
    display: "block",
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
  };
  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
