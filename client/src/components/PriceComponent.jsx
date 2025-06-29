import React from "react";

export const PriceComponent = ({ product }) => {
  console.log;

  return (
    <>
      {product.tags.includes("sale") ? (
        <div className="product-price-container">
          <strike className="price">
            £{(product.priceInPence / 100).toFixed(2)}
          </strike>
          <p className="discounted-price">
            £{(product.salePriceInPence / 100).toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="product-price">
          £{(product.priceInPence / 100).toFixed(2)}
        </p>
      )}
    </>
  );
};
