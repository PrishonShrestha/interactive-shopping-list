import React, { useState } from "react";
import "./ZoomableImage.css";

const ZoomableImage = ({ src, zoom = 2 }) => {
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [isHover, setIsHover] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div
      className="zoom-container"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: isHover ? `${zoom * 100}% ${zoom * 100}%` : "cover",
        backgroundPosition: backgroundPos,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    />
  );
};

export default ZoomableImage;
