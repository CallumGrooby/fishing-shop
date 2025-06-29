import { CartPage } from "../../pages/CartPage";
import { useUI } from "./UIContext";

export const CartModal = () => {
  const { modals, closeModal } = useUI();
  if (!modals.cartOpen) return null;

  return (
    <div className="modal">
      <button className="close-button" onClick={() => closeModal("cartOpen")}>
        x
      </button>

      <CartPage closeModal={closeModal} />
    </div>
  );
};
