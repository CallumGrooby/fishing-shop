import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Cart";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { PriceComponent } from "./PriceComponent";

export const ProductCard = (props) => {
  const { productDetails: product, class: className } = props;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const navigateTo = () => {
    console.log("clicked");
    navigate(`/product/${product._id}`);
  };

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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25 }}
      className={`product-card ${className}`}
      onClick={() => navigateTo()}
    >
      {product.tags.includes("sale") && <span className="tag">sale!</span>}

      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-details-bottom ">
          <PriceComponent product={product} />
          <button
            className="add-to-cart-button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
