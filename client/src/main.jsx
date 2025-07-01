import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./components/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { UIProvider } from "./components/UIModals/UIContext.jsx";
import { Hero } from "./components/Hero.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { CheckOutPage } from "./pages/CheckOutPage.jsx";
import { SuccessPage } from "./pages/SuccessPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/success", element: <SuccessPage /> },
      // { path: "/user/:userId", element: <UserProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </Provider>
  </StrictMode>
);
