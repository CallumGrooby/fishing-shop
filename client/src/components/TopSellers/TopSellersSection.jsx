import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";

export const TopSellersSection = () => {
  const products = useSelector((state) => state.products?.allProducts || []);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    if (!Array.isArray(products)) return;

    const filtered = products.filter((product) =>
      product.tags?.includes("top-seller")
    );

    if (JSON.stringify(filtered) !== JSON.stringify(topSellers)) {
      setTopSellers(filtered);
    }
  }, [products]);

  if (!products.length) {
    return <p className="text-center py-4">Loading top sellers...</p>;
  }

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
