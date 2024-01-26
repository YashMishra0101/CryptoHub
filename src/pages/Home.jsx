import React from "react";
import millify from "millify";
import { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { FaCoins } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";



const Home = ({ data, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(data.data.coins.slice(0, 12));
  const [searchError, setSearchError] = useState(false);
  const [showAllCoins, setShowAllCoins] = useState(false);
  
  const stats = data.data.stats;
  const coins = data.data.coins;

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

    setSearchQuery("")
  };

  console.log("Data in Home:", data);
  console.log("Data in Loading:", loading);


  return (
    <div className="overflow-hidden">
      <div className="container w-screen bg-gray-200 p-6 rounded-md shadow-md lg:mr-3">
        <h1 className="text-2xl font-sans font-bold mb-6 text-center text-gray-900 hover:underline">
          Global Crypto Status
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-gray-600">
              Total Cryptocurrencies <FaCoins />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              {millify(stats.totalCoins)} 
            </p>
          </div>
          <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-gray-600 ">
              Total Markets  <GoGraph />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              ${millify(stats.totalMarkets)}
            </p>
          </div>
          <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-gray-600 ">
              Total Exchanges <FaExchangeAlt />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              {stats.totalExchanges}
            </p>
          </div>
          <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-sm font-semibold text-gray-600 ">
              Total MarketCap <BsCurrencyExchange />
            </p>
            <p className="text-3xl text-green-700 font-medium">
              ${millify(stats.totalMarketCap)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-6 mt-4 rounded-md shadow-md">
        <h2 className="mt-2 mb-5 font-bold text-gray-900 md:text-3xl text-2xl text-center hover:underline">
          Top 12 Cryptocurrencies In The World
        </h2>
        <form onSubmit={handleSearchSubmit}>
          <div class="relative ml-4 mr-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-lg">
              <FaSearchDollar />
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 my-10 ps-8 md:ps-10 md:text-base text-[0.9rem] uppercase text-gray-900 border-2 outline-none border-gray-300 rounded-lg bg-gray-50  focus:border-gray-500"
              placeholder="Search Top 50 Coins"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute  end-1.5 md:end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Search
            </button>
          </div>
        </form>

        {showAllCoins && (
        <div className="w-full text-center md:text-right -mt-6 p-1">
          <button
            onClick={handleShowAllCoins}
            className="text-white bottom-2.5 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Show All Coins
          </button>
        </div>
      )}
   
        {searchError && (
          <div className="mt-4 p-3 text-center bg-red-100 border border-red-400 rounded-md ml-4 mr-4">
            <p className="text-red-500 md:text-2xl font-mono ">
              No matching coins Found 
            </p>
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mr-1">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className="w-64 h-[17rem] rounded overflow-hidden shadow-lg hover:shadow-2xl bg-white transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col mx-auto my-4">
              <div className="mt-1 mx-auto">
                <img
                  className="object-cover border-2 border-white rounded-full w-20 h-20"
                  src={coin.iconUrl}
                  alt="coin-logo"
                />
              </div>
              <div className="mt-3 px-6 pr-4 leading-loose flex-1">
                <p className="font-semibold text-2xl mb-2 text-gray-900">
                  {coin.name}
                </p>
                <p className="text-gray-700 text-base font-bold">
                  Price:
                  <span className="text-gray-600 text-base">
                    {" "}
                    ${millify(coin.price)}
                  </span>
                </p>
                <p className="text-gray-700 text-base font-bold">
                  Rank:
                  <span className="text-gray-600 text-base">
                    {" "}
                    ${coin.rank}
                  </span>
                </p>
                <p className="text-gray-700 text-base font-bold">
                  Market Cap:
                  <span className="text-gray-600 text-base">
                    {" "}
                    ${millify(coin.marketCap)}
                  </span>
                </p>
                <p className="text-gray-700 font-bold text-base">
                  Daily Changes:
                  <span className="text-gray-600 text-base">
                    {" "}
                    {millify(coin.change)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


