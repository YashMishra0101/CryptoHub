import React, { useState } from "react";
import millify from "millify";
import { FaSearchDollar } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { FaCoins } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import Footer from "../components/Footer";

const Home = ({ data, newsData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState(
    data?.data?.coins.slice(0, 12)
  );
  const [searchError, setSearchError] = useState(false);
  const [showAllCoins, setShowAllCoins] = useState(false);

  const stats = data?.data?.stats;
  const coins = data?.data?.coins;
  const loading = data.loading;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!loading && !coins) {
      setSearchError(true);
      return;
    }
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const slicedFilteredCoins = filtered.slice(0, 12);
    setFilteredCoins(slicedFilteredCoins);

    setSearchError(slicedFilteredCoins.length === 0);

    setShowAllCoins(true);
  };

  const handleShowAllCoins = () => {
    if (!loading && !coins) {
      setSearchError(true);
      return;
    }
    setFilteredCoins(coins.slice(0, 12));
    setShowAllCoins(false);
    setSearchError(false);
    setSearchQuery("");
  };

  return (
    <div className="overflow-hidden bg-gray-900 text-white">
      {!loading && !coins ? (
        <section className="bg-white dark:bg-gray-900 min-h-screen w-full">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                API is not working
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, Home page is not working
              </p>
              <a
                href="/aboutus"
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
              >
                Visit About Page
              </a>
            </div>
          </div>
        </section>
      ) : (
        <div className="container w-screen p-6 rounded-md shadow-md lg:mr-3">
          <h1
            className={`text-2xl font-sans font-bold mb-6 text-center hover:text-green-300 cursor-pointer select-none ${
              !loading && !coins && "text-red-500"
            }`}
          >
            {!loading && !coins ? (
              <div className=" mt-4 p-3 text-center bg-red-100 border border-red-400 rounded-md ml-4 mr-4">
                <p className="text-red-500 md:text-2xl font-mono">
                  Sorry, Api Is Not Working
                </p>
              </div>
            ) : (
              "Global Crypto Status"
            )}
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
      )}

      {!loading && coins && (
        <div className="p-6 mt-4 ">
          <h2 className="mt-2 mb-5 font-bold text-center md:text-3xl text-2xl">
            <span className="hidden sm:block hover:text-green-300 cursor-pointer select-none">
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
                className="text-white bg-gray-700 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mr-1 cursor-pointer">
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
                    <span
                      className={`text-base leading-6 ${
                        coin.change < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {coin.change < 0 ? "-" : "+"}
                      {millify(Math.abs(coin.change || 0))}%
                    </span>
                  </p>
                  <a
                    href={coin.coinrankingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold inline-block transition duration-300 hover:text-blue-500 transform hover:scale-105 py-1"
                  >
                    View More Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
