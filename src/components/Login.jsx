import React, { useState } from "react";
import {useNavigate } from "react-router";

const Login = () => {
  const [showpassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  mb-14 mt-10 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold md:text-2xl text-white">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={()=>navigate('/')}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type={showpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-2 text-base">
                      <label htmlFor="remember" class="text-blue-500 font-medium ">
                        Show password
                      </label>
                    </div>
                  </div>
                  <span
                    className="text-base font-medium text-blue-600 hover:underline ml-[3.5rem] lg:ml-[3.1rem] xl:ml-[3.1rem] text-center">
                    Forgot password ?
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-1">
                  Sign in
                </button>
                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet ?{" "}
                  <span
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                    onClick={() => navigate("/signup")}>
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
