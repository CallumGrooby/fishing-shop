import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../config/config";

export const SpecialOffers = () => {
  const [specialOffers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/get-special-offers`);
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
        <div key={i} className="overlay">
          <div className="offer">
            <h3 className="offer-title">{offer.title}</h3>
            <h2 className="offer-discount">{offer.maxPercentageOf}%</h2>
            <p className="offer-description">{offer.description}</p>
            <button className="offer-button">
              <h3>Shop Now</h3> <span className="text-lg">→</span>
            </button>
          </div>

          <div className="image-holder">
            <img src={offer.image} />
          </div>
        </div>
      ))}
    </div>
  );
};
