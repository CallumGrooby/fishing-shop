import React, { useState } from "react";
import { ProductCard } from "./ProductCard";

export const ProductCarousel = ({ products }) => {
  const [index, setIndex] = useState(0);
  const visibleCount = 4; // Change in CSS (.product-card  flex: 0 0 calc(100% / 4))
  const maxIndex = products.length - visibleCount;

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

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
            // <div className="carousel-slide" key={product._id}>
            //   <img src={product.image} alt={product.name} />
            //   <h4>{product.name}</h4>
            //   <p>£{(product.priceInPence / 100).toFixed(2)}</p>
            // </div>

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
