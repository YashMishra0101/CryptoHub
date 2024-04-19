import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./protectRoute/ProtectedRoute.jsx";

import {
  Home,
  Cryptocurrencies,
  News,
  Login,
  SignUp,
  Bookmarks,
  ResetPassword,
  CoinrankingApi,
  BingNewsApi,
  AIBot,
  AboutUs,
  PageNotFound,
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
      <Route path="news" element={<BingNewsApi />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="resetPassword" element={<ResetPassword />} />
      <Route
        path="aibot"
        element={
          <ProtectedRoute>
            <AIBot />
          </ProtectedRoute>
        }
      />
      <Route
        path="bookmarks"
        element={
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>
        }
      />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </React.StrictMode>
);
