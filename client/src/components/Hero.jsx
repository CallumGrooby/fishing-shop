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
      {/* <Sections products={products}></Sections> */}

      {/* {products.map((product, i) => {
        return (
          <div key={i}>
            {product.image && <img src={product.image} alt={product.name} />}

            <h1>{product.name}</h1>

            <div>
              <h2>£{product.priceInPence / 100}</h2>
              <button onClick={() => dispatch(addToCart(product))}>
                Add To Cart
              </button>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

const Sections = ({ products }) => {
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
      {sections.map((section) => (
        <div key={section._id}>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
          {/* You can now render a filtered carousel here */}

          {sections.map((section) => {
            if (section.type !== "product-carousel") return null;

            // Filter matching products
            const matchingProducts = products
              .filter((product) => {
                const categoryMatch = section.filters.category
                  ? product.category === section.filters.category
                  : true;

                const tagsMatch = section.filters.tags
                  ? section.filters.tags.every((tag) =>
                      product.tags?.includes(tag)
                    )
                  : true;

                return categoryMatch && tagsMatch;
              })
              .slice(0, section.limit || 4); // Apply section limit

            return (
              <div key={section._id} style={{ marginBottom: "2rem" }}>
                <h2>{section.title}</h2>
                <p>{section.subtitle}</p>

                <div className="product-row">
                  {matchingProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>£{(product.priceInPence / 100).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
