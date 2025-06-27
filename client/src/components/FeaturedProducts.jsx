import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export const FeaturedProducts = ({ products }) => {
  // const [featuredItems, setFeaturedItems] = useState([]);
  // const [shownProducts, setShownProducts] = useState([]);

  // const filterProducts = (unfilteredProducts) => {
  //   const filtered = unfilteredProducts.filter((product) =>
  //     product.tags.includes("featured")
  //   );
  //   setFeaturedItems(filtered);
  // };

  // useEffect(() => {
  //   filterProducts(products);
  // }, [products]);

  // useEffect(() => {
  //   if (featuredItems.length > 0) {
  //     handleCategory("reels"); // default selection
  //   }
  // }, [featuredItems]);

  // const handleCategory = (newCategory) => {
  //   const filtered = featuredItems.filter(
  //     (product) => product.category === newCategory
  //   );
  //   setShownProducts(filtered);
  // };

  const categories = ["all", "rods", "reels"];
  const [filter, setFilter] = useState("all");
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <div className="header">
        <span className="header-line" />
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

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {filteredProducts.map((hero) => (
            // <motion.div
            //   key={hero._id}
            //   layout
            //   initial={{ opacity: 0, scale: 0.8 }}
            //   animate={{ opacity: 1, scale: 1 }}
            //   exit={{ opacity: 0, scale: 0.8 }}
            //   transition={{ duration: 0.3 }}
            //   className="bg-gray-800 text-white p-4 rounded-xl shadow-md"
            // >
            //   <h3 className="text-lg font-bold">{hero.name}</h3>
            //   <p className="text-sm capitalize">{}</p>
            // </motion.div>

            <ProductCard key={hero._id} productDetails={hero} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
