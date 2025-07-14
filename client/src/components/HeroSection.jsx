import React from "react";
import bag from "../assets/bag.png";
import reel from "../assets/reel.png";
import leftSideShape from "../assets/hero-splash.svg";
import rightSideShape from "../assets/section-path.svg";
export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="left-section ">
        <div className="promo-container">
          <div className="promo-box">
            <div>
              <h2>Daiwa Cast'izm BR 25A Reel</h2>
              <p>Up to 50% off on selected items</p>
            </div>

            <button class="offer-button">
              <span>Shop Now</span>
              <span className="text-lg">→</span>
            </button>

            <img
              src={rightSideShape}
              alt="Decorative shape"
              className="custom-shape"
            />
          </div>

          <div className="image-holder">
            <div className="hero-image">
              <img src={reel} alt="Out door camping bag" />
            </div>
            <div className="price-tag">
              <p>Starting At</p>
              <span>$239.99</span>
            </div>
          </div>
        </div>

        <img src={leftSideShape} alt="Decorative shape" id="hero-top-shape" />
      </div>

      <div className="desktop-only right-section">
        <h2>Outdoor Supplies</h2>
        <p>Up to 50% off on selected items</p>

        <div className="hero-image">
          <img src={bag} alt="Out door camping bag" />
        </div>

        <button class="offer-button">
          <span>Shop Now</span>
          <span className="text-lg">→</span>
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
