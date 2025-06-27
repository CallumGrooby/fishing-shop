import { CartPage } from "../../pages/CartPage";
import { useUI } from "./UIContext";

export const CartModal = () => {
  const { modals, closeModal } = useUI();
  if (!modals.cartOpen) return null;

  return (
    <div className="modal">
      <button onClick={() => closeModal("cartOpen")}>Close</button>

      <CartPage />
    </div>
  );
};
