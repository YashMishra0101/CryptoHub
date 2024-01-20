import React, { useState } from "react";
import {useNavigate } from "react-router";


const SignUp = () => {
  const [showpassword, setShowPassword] = useState(false);

  const navigate=useNavigate();

  const handleCheckboxChange = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 mb-16 mt-10">
          <div className="pr-4 pl-4 space-y-4 pt-2 pb-3">
            <h1 className="text-center text-2xl font-bold  md:text-2xl text-white">
              Create account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={()=>navigate('/login')}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-white">
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
                  className="block mb-2 text-base font-medium text-white">
                  Password
                </label>
                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="  border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type={showpassword ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-2 text-base mb-1">
                  <label
                    htmlFor="terms"
                    className="font-medium text-primary-600  text-blue-500">
                    Show Password
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
              </button>
              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                Already have an account ? {""}
                <span 
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  onClick={()=>navigate("/login")}>
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
