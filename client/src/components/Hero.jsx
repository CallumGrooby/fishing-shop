import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addToCart } from "./Cart"; // same place you export the reducer

export const Hero = () => {
  const dispatch = useDispatch();

  // Top Sellers
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
    <div>
      {products.map((product, i) => {
        return (
          <div key={i}>
            {product.image && <img src={product.image} alt={product.name} />}

            <h1>{product.name}</h1>

            <div>
              <h2>£{product.priceInPence / 100}</h2>
              <button onClick={() => dispatch(addToCart(product._id))}>
                Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
