import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [modals, setModals] = useState({
    cartOpen: false,
    loginOpen: false,
    wishListOpen: false,
  });

  const openModal = (type) => setModals((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) =>
    setModals((prev) => ({ ...prev, [type]: false }));
  const toggleModal = (type) =>
    setModals((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <UIContext.Provider value={{ modals, openModal, closeModal, toggleModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
