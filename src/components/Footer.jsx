import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 mt-12 sm:mr-2 mr-0">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 cursor-pointer">
              <a className="flex items-center">
                <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  Cryptohub
                </span>
              </a>
              <div className="mt-3 text-sm font-bold hidden sm:block leading-7 w-[21rem] lg:mr-32 ">
                <p className="text-gray-400 font-medium">
                  Real-time cryptocurrency Data, News and AI-powered chat
                  assistance. Your go-to platform for staying updated on
                  cryptocurrency trends.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 w-full">
              <div>
                <h2 className="mb-6 text-sm font-semibold  uppercasetext-white text-white">
                  Company
                </h2>
                <ul className="font-medium  cursor-pointer">
                  <li className="mb-2 text-white">
                    <a href="/aboutus" className="hover:underline text-white">
                      About us
                    </a>
                  </li>
                  <li className="mb-2 text-white">
                    <a className="hover:underline">Business Contacts</a>
                  </li>
                  <li>
                    <a className="hover:underline text-white">Market updates</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-white">
                  Follow us
                </h2>
                <ul className=" font-medium  cursor-pointer">
                  <li className="mb-2">
                    <a className="hover:underline text-white">Github</a>
                  </li>
                  <li className="mb-2">
                    <a className="hover:underline text-white">Linkedin</a>
                  </li>
                  <li>
                    <a className="hover:underline text-white">Twitter</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className=" font-medium  cursor-pointer">
                  <li className="mb-2">
                    <a className="hover:underline text-white">Privacy Policy</a>
                  </li>
                  <li>
                    <a className="hover:underline text-white">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline text-white relative top-2">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              {/* Download section */}
              <div>
                <h3 className="text-lg font-semibold text-white">Download</h3>
                <ul className="mt-4  cursor-pointer">
                  <li>
                    <a className="hover:underline text-white">Android & iOS</a>
                  </li>

                  <li className="mt-2 hover:underline text-white">
                    <a>Windows</a>
                  </li>
                  <li className="mt-2 hover:underline text-white ">
                    <a>MacOS</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="#" className="hover:underline">
                CryptoHub™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4 text-lg">
              <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FaFacebookF />
              </a>
              <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FaGithub />
              </a>
              <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white mr-3">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
