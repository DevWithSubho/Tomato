import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Cart from "./pages/cart/cart.jsx";
import PlaceOrder from "./pages/placeorder/placeOrder.jsx";
import { StrictMode } from "react";
import store from "./store/itemsStore.jsx";
import { Provider } from "react-redux";
import { ContextProvider } from "./context/context.jsx";

import Verify from "./pages/Verify/Verify.jsx";

import MyOrders from "./pages/MyOrders/MyOrders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <PlaceOrder />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/myOrders",
        element: <MyOrders />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </Provider>,
  </StrictMode>
);
