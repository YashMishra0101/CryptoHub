import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

import {
  Home,
  Cryptocurrencies,
  Exchange,
  News,
  Login,
  SignUp,
  Bookmarks,
  UserAccount,
  ResetPassword,
  CoinrankingApi,
  BingNewsApi,
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
      <Route index element={<CoinrankingApi />} />
      <Route path="cryptocurrencies" element={<CoinrankingApi />} />
      <Route path="exchange" element={<Exchange />} />
      <Route path="news" element={<BingNewsApi/>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="resetPassword" element={<ResetPassword />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
