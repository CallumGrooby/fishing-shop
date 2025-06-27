import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const FeaturedProducts = ({ products }) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [shownProducts, setShownProducts] = useState([]);

  const filterProducts = (unfilteredProducts) => {
    const filtered = unfilteredProducts.filter((product) =>
      product.tags.includes("featured")
    );
    setFeaturedItems(filtered);
  };

  useEffect(() => {
    filterProducts(products);
  }, [products]);

  useEffect(() => {
    if (featuredItems.length > 0) {
      handleCategory("reels"); // default selection
    }
  }, [featuredItems]);

  const handleCategory = (newCategory) => {
    const filtered = featuredItems.filter(
      (product) => product.category === newCategory
    );
    setShownProducts(filtered);
  };

  return (
    <div>
      <div className="header py-2">
        <span className="header-line" />
        <h1 className="text-center">Featured Products</h1>
        <span className="header-line" />
      </div>

      <div className="category-buttons">
        <button onClick={() => handleCategory("reels")}>Reels</button>
        <button onClick={() => handleCategory("rods")}>Rods</button>
      </div>

      <div className="product-grid">
        {shownProducts.map((productInfo) => (
          <ProductCard productDetails={productInfo} />
        ))}
      </div>
    </div>
  );
};
