import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCarousel } from "./ProductCarousel";
import { useSelector } from "react-redux";

export const FeaturedCategories = () => {
  const products = useSelector((state) => state.products?.allProducts || []);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-home-sections");
        setSections(res.data); // ← this is the parsed JSON already
        console.log("Homepage Sections:", res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  return (
    <div>
      {sections.map((section) => {
        if (section.type !== "product-carousel") return null;

        const matchingProducts = products
          .filter((product) => {
            const categoryMatch = section.filters.category
              ? product.category === section.filters.category
              : true;

            const tagsMatch = section.filters.tags
              ? section.filters.tags.every((tag) => product.tags?.includes(tag))
              : true;

            return categoryMatch && tagsMatch;
          })
          .slice(0, section.limit ? section.limit - 1 : 3); // Reserve one spot for custom item

        // Insert custom product-like card
        const customItem = {
          _id: `custom-${section._id}`, // Ensure unique key
          title: section.title,
          description: section.subtitle,
          image: section.image,
          isCustom: true,
        };

        const finalProducts = [customItem, ...matchingProducts];

        return (
          <div key={section._id} style={{ marginBottom: "8px" }}>
            <ProductCarousel products={finalProducts} />
          </div>
        );
      })}
    </div>
  );
};
