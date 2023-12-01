import { useState } from "react";
import PropTypes from "prop-types";
import StarIconFilled from "./StarIconFilled";
import StarIcon from "./StartIcon";

// const person = {
//   name: "Umar"
//   age: 21
// }

// const age = 12;

// const { age: personAge } = person;

// age => 12
// personAge => 21

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  function handleRating(rate) {
    setRating(rate);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    display: "block",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <StarIconFilled color={color} /> : <StarIcon color={color} />}
    </span>
  );
}

export default StarRating;

StarRating.prototype = {
  maxRating: PropTypes.number,
};
