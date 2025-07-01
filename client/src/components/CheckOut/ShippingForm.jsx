import axios from "axios";
import React, { useEffect } from "react";

export const ShippingForm = ({ handleSubmit }) => {
  return (
    <div className="cart-items">
      <form id="shipping-form" onSubmit={handleSubmit}>
        <h2 className="title">Delivery Information</h2>

        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9\s+]+"
          required
        />

        <label htmlFor="address1">Address Line 1</label>
        <input type="text" id="address1" name="address1" required />

        <label htmlFor="address2">Address Line 2 (optional)</label>
        <input type="text" id="address2" name="address2" />

        <label htmlFor="city">Town / City</label>
        <input type="text" id="city" name="city" required />

        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          required
          pattern="[A-Za-z]{1,2}[0-9R][0-9A-Za-z]?\s?[0-9][A-Za-z]{2}"
        />

        <label htmlFor="country">Country</label>
        <select id="country" name="country" required defaultValue="GB">
          <option value="GB">United Kingdom</option>
          <option value="JE">Jersey</option>
          <option value="GG">Guernsey</option>
          <option value="IM">Isle of Man</option>
        </select>
      </form>
    </div>
  );
};
