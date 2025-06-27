import React from "react";
import accountIcon from "../assets/Account.png";
import wishListIcon from "../assets/Wishlist.png";
import cartIcon from "../assets/Cart.png";
import searchIcon from "../assets/Search.svg";
import { useUI } from "./UIModals/UIContext";
import { Outlet } from "react-router";
import { CartModal } from "./UIModals/CartModal";

export const Navbar = () => {
  const { toggleModal } = useUI();

  return (
    <>
      <nav className="container mx-auto flex felx-row justify-between pt-4">
        <span className="relative border-2 border-gray-400 px-4 py-2 rounded-sm">
          <input
            className="focus:shadow-none ring-0 border-0 outline-none relative"
            placeholder="Search For a Product"
          ></input>
          <button className="absolute inset-0 flex items-center justify-end-safe px-4 py-2">
            <img src={searchIcon}></img>
          </button>
        </span>

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
