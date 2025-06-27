import React from "react";
import bag from "../assets/bag.png";
import shape from "../assets/section-path.svg";
export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="right-section ">Hello</div>

      <div className="left-section">
        <h2>Outdoor Supplies</h2>
        <p>Up to 50% off on selected items</p>

        <div className="hero-image">
          <img src={bag} alt="Out door camping bag" />
        </div>

        <button class="offer-button">
          <h3>Shop Now</h3> <span className="text-lg">→</span>
        </button>
        {/* <img src={shape} alt="Decorative shape" className="custom-shape" /> */}
      </div>
    </section>
  );
};
