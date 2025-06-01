import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Hero } from "./components/Hero";
import { CartPage } from "./pages/CartPage";

function App() {
  const handleClick = () => {
    console.log("Button Clicked");
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: "6834529eac09774ea1c91d05", quantity: 3 },
          { id: "683452ddac09774ea1c91d06", quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log(url);
        // window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <>
      {/* <button onClick={handleClick}>Checkout</button> */}
      <CartPage />
      <Hero />
    </>
  );
}

export default App;
