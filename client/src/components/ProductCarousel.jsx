import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

const getVisibleCount = () => {
  const width = window.innerWidth;
  if (width < 600) return 1;
  if (width < 1024) return 2;
  return 4;
};

export const ProductCarousel = ({ products }) => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const maxIndex = Math.max(0, products.length - visibleCount);

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <button onClick={prev} disabled={index === 0}>
          ←
        </button>
        <button onClick={next} disabled={index === maxIndex}>
          →
        </button>
      </div>

      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
        >
          {products.map((product) => (
            <ProductCard class={"carousel-product"} productDetails={product} />
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};
