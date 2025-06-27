import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FeaturedCategories } from "../components/FeaturedCategories";
import { TopSellersSection } from "../components/TopSellers/TopSellersSection";
import { SpecialOffers } from "../components/SpecialOffers";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { HeroSection } from "../components/HeroSection";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const FetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get-products");
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const products = await FetchProducts();
      if (!products) return;

      if (!products?.data?.products) return;
      setProducts(products.data.products);
      console.log(products.data.products);
    };

    fetchAndSetProducts();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Hero */}
      <HeroSection />
      {/* Top Sellers */}
      <TopSellersSection products={products} />
      {/* Sales */}
      <SpecialOffers />
      {/*Categories */}
      <FeaturedCategories products={products} />

      {/* Featured Products */}
      <FeaturedProducts products={products} />
    </div>
  );
};
