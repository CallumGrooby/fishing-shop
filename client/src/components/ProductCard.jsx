import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Cart";
import test from "../assets/test.png";
export const ProductCard = (props) => {
  const { productDetails: product, class: className } = props;
  const dispatch = useDispatch();

  if (product.isCustom) {
    return (
      <div className="carousel-product section-card">
        <img src={product.image} alt={product.title} />
        <div className="section-details">
          <h3 className="title">{product.title}</h3>
          <p className="description">{product.description}</p>

          <button className="button ">Explore More</button>
        </div>
      </div>
    );
  }

  return (
    <div key={product._id} className={`product-card ${className}`}>
      {product.tags.includes("sale") && <span className="tag">sale!</span>}

      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-details-bottom ">
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
            <p className="product-descripton">
              £{(product.priceInPence / 100).toFixed(2)}
            </p>
          )}
          {/* <p className="product-descripton">
            £{(product.priceInPence / 100).toFixed(2)}
          </p> */}
          <button
            className="add-to-cart-button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
