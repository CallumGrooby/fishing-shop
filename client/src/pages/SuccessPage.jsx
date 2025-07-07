import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useFetcher, useSearchParams } from "react-router-dom";
import { Cart } from "../components/CheckOut/Payment";
import { PriceSummary } from "../components/CheckOut/PriceSummary";
import { fetchProducts } from "../components/Store/productThunk";

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/checkout-data?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((fetchedData) => {
          console.log(fetchedData);
          setData(fetchedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId]);

  const products = useSelector((state) => state.products?.allProducts || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Products", products);
    console.log("Orders", data);

    if (products.length <= 0 || !data) return;

    const orderedItems = data.items.map((item) => {
      const product = products.find((p) => p._id === item.id);

      return {
        ...product,
        quantity: item.quantity,
      };
    });
    setCartItems(orderedItems);
    console.log("Order Items", orderedItems);
  }, [data, products]);

  if (loading) return <p>Loading...</p>;

  if (!data) return <p>Error loading order.</p>;

  return (
    <div className="payment-section">
      <section className="cart-items">
        <div className="">
          <h2
            className="title"
            style={{ cursor: "pointer", marginTop: "1rem" }}
          >
            Items in Your Order
          </h2>
          <Cart cartItems={cartItems} />
        </div>
        {data.shipping && (
          <div className="inputted-address-section">
            <h2 className="title">Delivery Address</h2>

            <div className="shipping-review">
              <div className="shipping-row">
                <span>Full Name</span>
                <span>{data.shipping.fullName}</span>
              </div>
              <div className="shipping-row">
                <span>Email</span>
                <span>{data.shipping.email}</span>
              </div>
              <div className="shipping-row">
                <span>Phone</span>
                <span>{data.shipping.phone}</span>
              </div>
              <div className="shipping-row">
                <span>Address</span>
                <span>
                  {data.shipping.address1}
                  {data.shipping.address2 && `, ${data.shipping.address2}`}
                </span>
              </div>
              <div className="shipping-row">
                <span>City</span>
                <span>{data.shipping.city}</span>
              </div>
              <div className="shipping-row">
                <span>Postcode</span>
                <span>{data.shipping.postcode}</span>
              </div>
              <div className="shipping-row">
                <span>Country:</span>
                <span>{data.shipping.country}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Right: Summary + Checkout */}
      <div className="summary-section">
        <PriceSummary items={cartItems} showCoupon={false} />
        <Link to={"/"} className="continue-btn">
          Back to website
        </Link>
      </div>
    </div>
  );
};
