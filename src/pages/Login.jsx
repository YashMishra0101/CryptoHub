import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true"); // Save login status in local storage
      toast.success("Login Successful");
      setIsLoggedIn(true); // Update login status state
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 h-[40rem] overflow-hidden">
        <div className="flex flex-col items-center justify-center px-6 py-7 mx-auto md:h-screen lg:py-0 relative top-16">
          <div className="w-full  rounded-lg shadow dborder md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 mb-14 mt-10 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="md:text-center font-bold text-2xl text-white">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id="showpassword"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
                      />
                    </div>
                    <div className="ml-2 mb-1  text-base cursor-pointer ">
                      <label
                        htmlFor="showpassword"
                        className="text-blue-500 font-medium cursor-pointer "
                      >
                        Show password
                      </label>
                    </div>
                  </div>
                  <div
                    className="text-base font-medium text-blue-600 hover:underline ml-[3.5rem] lg:ml-[3.1rem] xl:ml-[3.1rem] text-center cursor-pointer pb-1"
                    onClick={() => navigate("/resetPassword")}
                  >
                    Forgot password
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-1"
                >
                  Sign in
                </button>
                <p className="text-base font-light text-gray-500 dark:text-gray-400 cursor-pointer">
                  Don’t have an account yet ?{" "}
                  <span
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
