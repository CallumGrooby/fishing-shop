import axios from "axios";
import React, { useEffect } from "react";

export const ShippingForm = () => {
  const enteredPostCode = "pe22 8ja";

  useEffect(() => {
    const fetchAddressByPostCode = async (postcode) => {
      try {
        const res = await axios.get(
          `https://api.postcodes.io/postcodes/${postcode}`
        );

        console.log(res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchAddressByPostCode(enteredPostCode);
  }, [enteredPostCode]);

  return (
    <div>
      <form id="shipping-form">
        <h2>Delivery Information</h2>

        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" required />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label for="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9\s+]+"
          required
        />

        <label for="address1">Address Line 1</label>
        <input type="text" id="address1" name="address1" required />

        <label for="address2">Address Line 2 (optional)</label>
        <input type="text" id="address2" name="address2" />

        <label for="city">Town / City</label>
        <input type="text" id="city" name="city" required />

        <label for="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          required
          pattern="[A-Za-z]{1,2}[0-9R][0-9A-Za-z]?\s?[0-9][A-Za-z]{2}"
        />

        <label for="country">Country</label>
        <select id="country" name="country" required>
          <option value="GB" selected>
            United Kingdom
          </option>
          <option value="JE">Jersey</option>
          <option value="GG">Guernsey</option>
          <option value="IM">Isle of Man</option>
        </select>

        <button type="submit">Continue to Payment</button>
      </form>
    </div>
  );
};
