import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FeaturedCategories } from "../components/FeaturedCategories";
import { TopSellersSection } from "../components/TopSellers/TopSellersSection";
import { SpecialOffers } from "../components/SpecialOffers";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { HeroSection } from "../components/HeroSection";
import { fetchProducts } from "../components/Store/productThunk";
import { useDispatch, useSelector } from "react-redux";

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const status = useSelector((state) => state.products?.status);
  const error = useSelector((state) => state.products?.error);

  if (status === "loading") {
    return <p className="text-center py-4">Loading Products...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center py-4 text-red-500">
        Failed to load products: {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto">
      <HeroSection />
      <TopSellersSection />
      <SpecialOffers />
      <FeaturedCategories />
      <FeaturedProducts />
    </div>
  );
};
