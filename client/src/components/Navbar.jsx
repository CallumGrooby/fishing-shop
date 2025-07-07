import React from "react";
import accountIcon from "../assets/Account.png";
import wishListIcon from "../assets/Wishlist.png";
import cartIcon from "../assets/Cart.png";

import { useUI } from "./UIModals/UIContext";
import { Outlet } from "react-router-dom";
import { CartModal } from "./UIModals/CartModal";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const { toggleModal } = useUI();

  return (
    <>
      <nav className="container mx-auto flex felx-row justify-between pt-4">
        <SearchBar />

        <div className="flex flex-row gap-2">
          <img
            className="size-6"
            src={wishListIcon}
            alt=""
            onClick={() => toggleModal("wishlistOpen")}
          />
          <img
            className="size-6"
            src={accountIcon}
            alt=""
            onClick={() => toggleModal("loginOpen")}
          />
          <img
            className="size-6"
            src={cartIcon}
            alt=""
            onClick={() => toggleModal("cartOpen")}
          />
        </div>
      </nav>

      <CartModal />

      <Outlet />
    </>
  );
};
