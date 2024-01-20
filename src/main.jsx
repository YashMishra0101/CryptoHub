import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Home,
  Cryptocurrencies,
  Exchange,
  News,
  Login,
  SignUp,
  Bookmarks,
  UserAccount,
  ResetPassword
} from "./components/index.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
      <Route path="exchange" element={<Exchange />} />
      <Route path="news" element={<News />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="resetPassword" element={<ResetPassword />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
