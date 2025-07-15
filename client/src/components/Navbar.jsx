import React from "react";

import { useUI } from "./UIModals/UIContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartModal } from "./UIModals/CartModal";
import { SearchBar } from "./SearchBar";
import { AccountIcon } from "./Icons/AccountIcon";
import { WishlistIcon } from "./Icons/WishListIcon";
import { CartIcon } from "./Icons/CartIcon";
import logo from "../../public/logo.png";
export const Navbar = () => {
  const { toggleModal } = useUI();

  return (
    <>
      <nav className="container">
        <div className="desktop-only">
          <SearchBar />
        </div>

        <Link to={"/"} className="logo-container">
          <img src={logo} alt="logo" />
        </Link>

        <div className="flex flex-row gap-2">
          <div className="mobile-only">
            <SearchBar iconOnly />
          </div>

          <WishlistIcon
            className="nav-icon"
            onClick={() => toggleModal("wishlistOpen")}
          />
          <AccountIcon
            className="nav-icon"
            onClick={() => toggleModal("loginOpen")}
          />
          <CartIcon
            className="nav-icon"
            onClick={() => {
              toggleModal("cartOpen");
            }}
          />
        </div>
      </nav>

      <CartModal />

      <Outlet />
    </>
  );
};
