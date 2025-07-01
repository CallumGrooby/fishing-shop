import React from "react";
import bag from "../assets/bag.png";
import leftSideShape from "../assets/hero-splash.svg";
import rightSideShape from "../assets/section-path.svg";
export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="left-section ">
        <h2>Outdoor Supplies</h2>
        <p>Up to 50% off on selected items</p>

        <div className="hero-image">
          <img src={bag} alt="Out door camping bag" />
        </div>

        <button class="offer-button">
          <h3>Shop Now</h3> <span className="text-lg">→</span>
        </button>

        <img
          src={leftSideShape}
          alt="Decorative shape"
          className="custom-shape"
        />
      </div>

      <div className="right-section">
        <h2>Outdoor Supplies</h2>
        <p>Up to 50% off on selected items</p>

        <div className="hero-image">
          <img src={bag} alt="Out door camping bag" />
        </div>

        <button class="offer-button">
          <h3>Shop Now</h3> <span className="text-lg">→</span>
        </button>
        <img
          src={rightSideShape}
          alt="Decorative shape"
          className="custom-shape"
        />
      </div>
    </section>
  );
};
