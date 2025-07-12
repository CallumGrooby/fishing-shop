import { Link } from "react-router-dom";
import { EmptyCartIcon } from "../assets/EmptyCartIcon.jsx";

export const OrderCancelled = () => (
  <div className="empty-cart-wrapper">
    <EmptyCartIcon />
    <p>Your order was cancelled.</p>
    <Link to="/" className="back-to-shop-btn">
      Back to Shop →
    </Link>
  </div>
);
