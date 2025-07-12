import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useMemo } from "react";
export const FeaturedProducts = () => {
  const products = useSelector((state) => state.products?.allProducts || []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const [filter, setFilter] = useState("all");
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <div className="header">
        <span className="desktop-only header-line" />
        <h2 className="text-center">Featured Products</h2>
        <span className="header-line" />
      </div>

      <div className="mb-4 flex gap-2 category-buttons">
        {categories.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-4 py-2 rounded ${
              filter === r ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* <div className="product-grid">
        {shownProducts.map((productInfo) => (
          <ProductCard productDetails={productInfo} />
        ))}
      </div> */}

      <motion.div layout className="product-track">
        <AnimatePresence>
          {filteredProducts.map((hero) => (
            <ProductCard key={hero._id} productDetails={hero} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
