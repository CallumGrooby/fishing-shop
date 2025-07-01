import React, { useState } from "react";

export const PriceSummary = ({
  items,
  deliveryFee = 1500,
  showCoupon = true,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  console.log(items);

  // Calculate subtotal (pence)
  const subtotalPence = items.reduce((sum, item) => {
    const price = item.salePriceInPence ?? item.priceInPence;
    return sum + price;
  }, 0);

  const discountPence = Math.round(subtotalPence * (discountPercent / 100));
  const totalPence = subtotalPence - discountPence + deliveryFee;

  const format = (pence) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(pence / 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    // Simulated coupon check
    if (couponCode.toLowerCase() === "save20") {
      setDiscountPercent(20);
    } else {
      setDiscountPercent(0);
      alert("Invalid coupon");
    }
  };

  return (
    <div className="price-summary">
      {/* Coupon Code Form */}

      {showCoupon && (
        <form onSubmit={handleApplyCoupon} className="coupon-form">
          <input
            type="text"
            name="coupon"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="coupon-input"
          />
          <button type="submit" className="apply-btn ">
            Apply
          </button>
        </form>
      )}

      {/* Price Breakdown */}
      <div className="row">
        <span>Subtotal</span>
        <span>{format(subtotalPence)}</span>
      </div>

      {discountPercent > 0 && (
        <div className="row discount">
          <span>Discount ({discountPercent}%)</span>
          <span>-{format(discountPence)}</span>
        </div>
      )}

      <div className="row">
        <span>Delivery Fee</span>
        <span>{format(deliveryFee)}</span>
      </div>

      <hr />

      <div className="row title">
        <strong>Total</strong>
        <strong>{format(totalPence)}</strong>
      </div>
    </div>
  );
};
