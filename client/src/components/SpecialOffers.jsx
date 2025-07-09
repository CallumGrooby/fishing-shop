import axios from "axios";
import React, { useEffect, useState } from "react";

export const SpecialOffers = () => {
  const [specialOffers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-special-offers");
        setOffers(res.data);
        console.log("special offers:", res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="special-offers-wrapper">
      {specialOffers.map((offer, i) => (
        <div key={i} class="overlay">
          <div className="offer">
            <h3 class="offer-title">{offer.title}</h3>
            <h2 class="offer-discount">{offer.maxPercentageOf}%</h2>
            <p class="offer-description">{offer.description}</p>
            <button class="offer-button">
              <h3>Shop Now</h3> <span className="text-lg">→</span>
            </button>
          </div>

          <div className="image-holder">
            <div className=""></div>
          </div>
        </div>
      ))}
    </div>
  );
};
