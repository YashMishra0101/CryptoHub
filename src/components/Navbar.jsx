import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-evenly bg-slate-300">
          <li>
            <NavLink to="/">
              <img
                src="src\assets\cryptocurrency.png"
                alt=""
                className="w-16 h-16 "
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="cryptocurrencies">Cryptocurrencies</NavLink>
          </li>
          <li>
            <NavLink to="exchange">Exchange</NavLink>{" "}
          </li>

          <li>
            <NavLink to="news">News</NavLink>
          </li>

          <li>
            <NavLink to="login">Login</NavLink>
          </li>
          <li>
            <NavLink to="signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
