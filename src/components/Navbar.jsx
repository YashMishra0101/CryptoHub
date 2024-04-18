import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../src/firebase/FirebaseConfig";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase authentication status change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
        localStorage.setItem("user", JSON.stringify(user)); // Save user data to local storage
      } else {
        setIsLoggedIn(false); // User is signed out
        localStorage.removeItem("user"); // Remove user data from local storage
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from listener
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Using functional update to toggle isOpen
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false); // Update isLoggedIn state
        localStorage.clear("user"); // Remove user data from local storage
        closeMenu(); // Close menu after logout
        toast.success("Logout Successful"); // Show success toast
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again."); // Show error toast
      });
  };

  const handleNavLinkClick = () => {
    closeMenu();
  };

  const handleAiHelpClick = () => {
    if (!isLoggedIn) {
      toast.error("Please Login To Access AI Help"); // Show error toast
      navigate("/login");
    } else {
      navigate("/aibot");
    }
  };

  return (
    <nav className="border-gray-200 bg-gray-900 select-none w-full z-30">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center space-x-3">
          <NavLink to="/">
            <img src={logo} className="h-8" alt="Cryptohub Logo" />
          </NavLink>
          <NavLink to="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Cryptohub
            </span>
          </NavLink>
        </span>
        <div className="hidden text-base font-sans md:flex md:flex-row md:space-x-8 rtl:space-x-reverse">
          <NavLink
            className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="cryptocurrencies"
          >
            Cryptocurrencies
          </NavLink>
          <NavLink
            className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="news"
          >
            News
          </NavLink>
          <NavLink
            className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="/aibot"
            onClick={handleAiHelpClick}
          >
            AI-Help
          </NavLink>
          <NavLink
            className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="/aboutUs"
          >
            About us
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
                to="/signup"
              >
                Sign Up
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink
                className="py-2 px-3 relative top-[0.68rem] md:top-0  hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
                to="bookmarks"
              >
                Bookmark
              </NavLink>

              <NavLink
                className="py-2 px-3 hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
                to="/"
                onClick={logout}
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleMenu}
        >
          <FiMenu className="text-[2rem]" />
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:hidden mt-4 border rounded-md font-medium text-base md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 pb-2 `}
          id="navbar-default"
        >
          <NavLink
            className="block py-2 px-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            className="block py-2 px-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
            to="cryptocurrencies"
            onClick={closeMenu}
          >
            Cryptocurrencies
          </NavLink>
          <NavLink
            className="block py-2 px-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
            to="news"
            onClick={closeMenu}
          >
            News
          </NavLink>
          <NavLink
            className="py-2 px-3 relative top-[0.50rem] hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
            to="/aibot"
            onClick={() => {
              {
                toggleMenu();
                handleAiHelpClick();
              }
            }}
          >
            AI-Help
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                className="block py-2 px-3 relative top-[1.1rem] hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
                to="bookmarks"
                onClick={closeMenu}
              >
                Bookmark
              </NavLink>
              <NavLink
                className="py-2 px-3 relative top-[1.3rem] hover:bg-transparent border-b-2 border-transparent text-white hover:text-blue-500"
                to="/aboutus"
              >
                About Us
              </NavLink>
              <NavLink
                className="block py-2 px-3 relative top-[1.3rem] mb-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
                to="/"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
              >
                Logout
              </NavLink>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                className="block py-2 relative top-[0.75rem] px-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                className="block py-2 px-3 relative top-[0.70rem] hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
                to="/aboutus"
                onClick={closeMenu}
              >
                About Us
              </NavLink>
              <NavLink
                className="block py-2 px-3 relative top-[0.70rem] mb-3 hover:bg-transparent md:border-0 md:p-0 text-white hover:text-blue-500"
                to="/signup"
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
