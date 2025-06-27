import React, { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";

export const TopSellersSection = (props) => {
  const { products } = props;
  const [topSellers, setTopSellers] = useState([]);
  const filterProducts = (unfilteredProducts) => {
    const filteredProducts = unfilteredProducts.filter((product) =>
      product.tags.includes("top-seller")
    );
    console.log(filteredProducts);
    setTopSellers(filteredProducts);
  };

  useEffect(() => {
    filterProducts(products);
  }, [products]);

  return (
    <div>
      <div className="header py-2">
        <span className="header-line" />
        <h2 className="text-center">Our Top Sellers</h2>
        <span className="header-line" />
      </div>

      <div className="product-track">
        {topSellers.map((productInfo, i) => (
          <ProductCard key={i} productDetails={productInfo} />
        ))}
      </div>
    </div>
  );
};
