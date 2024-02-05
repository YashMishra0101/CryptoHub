import React, { useEffect } from "react";
import millify from "millify";
import { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { FaCoins } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import logo from "../assets/logo.png";

const Home = ({ data, newsData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState(
    data?.data?.coins.slice(0, 12)
  );
  const [searchError, setSearchError] = useState(false);
  const [showAllCoins, setShowAllCoins] = useState(false);

  const stats = data?.data?.stats;
  const coins = data?.data?.coins;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Filter coins based on the search query
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with the first 12 filtered coins
    const slicedFilteredCoins = filtered.slice(0, 12);
    setFilteredCoins(slicedFilteredCoins);

    // Update search error state
    setSearchError(slicedFilteredCoins.length === 0);

    // Show the "Show All Coins" button
    setShowAllCoins(true);
  };

  const handleShowAllCoins = () => {
    // Show all coins
    setFilteredCoins(coins.slice(0, 12));
    // Hide the "Show All Coins" button
    setShowAllCoins(false);
    // Clear the search error
    setSearchError(false);

    setSearchQuery("");
  };

  return (
    <div className="overflow-hidden bg-gray-900 text-white">
      <div className="container w-screen p-6 rounded-md shadow-md lg:mr-3">
        <h1 className="text-2xl font-sans font-bold mb-6 text-center">
          Global Crypto Status
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="hover:bg-gray-700 transition duration-300 ease-in-out bg-gray-800 p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-white">
              Total Cryptocurrencies <FaCoins />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              {millify(stats?.totalCoins)}
            </p>
          </div>
          <div className="hover:bg-gray-700 transition duration-300 ease-in-out bg-gray-800 p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-white ">
              Total Markets <GoGraph />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              ${millify(stats?.totalMarkets)}
            </p>
          </div>
          <div className="hover:bg-gray-700 transition duration-300 ease-in-out bg-gray-800 p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-white ">
              Total Exchanges <FaExchangeAlt />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              {stats?.totalExchanges}
            </p>
          </div>
          <div className="hover:bg-gray-700 transition duration-300 ease-in-out bg-gray-800 p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-white ">
              Total MarketCap <BsCurrencyExchange />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              ${millify(stats?.totalMarketCap)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-4 ">
        <h2 className="mt-2 mb-5 font-bold text-center md:text-3xl text-2xl">
          <span className="hidden sm:block">
            {" "}
            Top 12 Cryptocurrencies In The World
          </span>
          <span className="sm:hidden block text-[1.7rem] py-2 text-center bg-gray-900 text-green-100 p-[0.40rem] rounded-md font-serif">
            Top 12 Cryptocurrencies
          </span>
        </h2>

        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-lg">
              <FaSearchDollar />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 my-10 ps-8 md:ps-10 md:text-base text-[0.9rem] uppercase border-2 outline-none rounded-lg bg-gray-800 border-gray-500"
              placeholder="Search Top 50 Coins"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-1.5 md:end-2.5 bottom-2.5 bg-gray-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {showAllCoins && (
          <div className="w-full text-center md:text-right -mt-6 p-1">
            <button
              onClick={handleShowAllCoins}
              className="text-white bg-gray-800 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
            >
              Show All Coins
            </button>
          </div>
        )}

        {searchError && (
          <div className="mt-4 p-3 text-center bg-red-100 border border-red-400 rounded-md ml-4 mr-4">
            <p className="text-red-500 md:text-2xl font-mono">
              No matching coins Found
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mr-1 cursor-pointer">
          {filteredCoins?.map((coin, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 p-3 bg-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex flex-col"
            >
              <div className="mt-1 mb-2 mx-auto">
                <img
                  className="object-cover border-2 border-gray-800 rounded-full w-20 h-20"
                  src={coin.iconUrl}
                  alt="coin-logo"
                />
              </div>
              <div className="mt-3 px-6 pr-4 leading-loose flex-1">
                <p className="font-semibold text-2xl mb-2">{coin.name}</p>
                <p className="text-white text-base font-bold">
                  Price:{" "}
                  <span className="text-white text-base leading-6">
                    ${millify(coin.price)}
                  </span>
                </p>
                <p className="text-gray-300 text-base font-bold">
                  Rank:{" "}
                  <span className="text-white text-base">{coin.rank}</span>
                </p>
                <p className="text-gray-300 text-base font-bold">
                  Market Cap:{" "}
                  <span className="text-white text-base leading-6">
                    ${millify(coin.marketCap)}
                  </span>
                </p>
                <p className="text-gray-300 font-bold text-base">
                  Daily Changes:{" "}
                  <span className="text-white text-base leading-6">
                    {millify(coin.change)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-white dark:bg-gray-900 mt-12">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Cryptohub
                </span>
              </a>
              <div className="mt-3 text-sm font-bold hidden sm:block leading-7 w-[50%]">
                <p className="text-gray-400 font-medium">
                  Explore live charts for various coins on this platform for
                  live crypto data and daily news, staying updated with the
                  latest trends.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Company
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://www.investopedia.com/terms/c/cryptocurrency.asp"
                      className="hover:underline"
                    >
                      About us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Business Contacts
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Market updates
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
