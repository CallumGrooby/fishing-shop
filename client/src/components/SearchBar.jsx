import React, { useEffect, useState } from "react";
import searchIcon from "../assets/Search.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Cart";
import { AnimatePresence, motion } from "framer-motion";
import { PriceComponent } from "./PriceComponent";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ iconOnly = false }) => {
  const products = useSelector((state) => state.products?.allProducts || []);

  const [inputValue, setInputValue] = useState("");
  const [debounceInputValue, setDebouncedInputValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const debounceDuration = 500;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const clearSearch = () => {
    setInputValue("");
    setDebouncedInputValue("");
    setMobileSearchOpen(false);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, debounceDuration);

    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(debounceInputValue.toLowerCase())
  );

  // Mobile-only icon
  if (iconOnly) {
    return (
      <>
        <button
          className="search-icon-button"
          onClick={() => setMobileSearchOpen(true)}
        >
          <img src={searchIcon} alt="Search" />
        </button>

        {/* Mobile Fullscreen Overlay */}
        {mobileSearchOpen && (
          <div className="mobile-search-overlay">
            <div className="mobile-search-header">
              <div className="search-bar">
                <input
                  className="search-input"
                  placeholder="Search For a Product"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <div className="search-button">
                  <img src={searchIcon} alt="Search" />
                </div>
              </div>
              <button className="close-button" onClick={clearSearch}>
                X
              </button>
            </div>

            <ul className="mobile-search-results">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <Product
                    key={product._id}
                    productInfo={product}
                    clearSearch={clearSearch}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </>
    );
  }

  // Desktop full search bar
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search For a Product"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="search-button">
          <img src={searchIcon} alt="Search" />
        </div>
      </div>

      {debounceInputValue.trim() !== "" && (
        <ul className="search-bar-products-list">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <Product
                key={product._id}
                productInfo={product}
                clearSearch={clearSearch}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

const Product = ({ productInfo: item, clearSearch }) => {
  let navigate = useNavigate();

  const navigateTo = () => {
    clearSearch();

    navigate(`/product/${item._id}`);
  };

  return (
    <motion.li
      className="search-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
      layout
      onClick={() => navigateTo()}
    >
      <div className="search-item-image-container">
        <img src={item.image} alt={item.name} className="product-image" />
      </div>

      <div className="product-info">
        <p className="product-name">{item.name}</p>
        <PriceComponent product={item} />
      </div>
    </motion.li>
  );
};
