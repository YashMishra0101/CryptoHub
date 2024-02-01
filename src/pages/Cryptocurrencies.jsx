import React from "react";
import millify from "millify";
import { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";

const Cryptocurrencies = ({ data, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState(data.data.coins);
  const [searchError, setSearchError] = useState(false);
  const [showAllCoins, setShowAllCoins] = useState(false);

  const coins = data.data.coins;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Filter coins based on the search query
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with the filtered coins
    setFilteredCoins(filtered);

    // Update search error state
    setSearchError(filtered.length === 0);

    // Show the "Show All Coins" button
    setShowAllCoins(true);
  };

  const handleShowAllCoins = () => {
    // Show all coins
    setFilteredCoins(coins);
    // Hide the "Show All Coins" button
    setShowAllCoins(false);
    // Clear the search error
    setSearchError(false);

    setSearchQuery("");
  };

  console.log("Data in Home:", data);
  console.log("Data in Loading:", loading);

  return (
    <div className="w-screen overflow-hidden bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-8 hover:text-green-200 select-none">
        <span className="hidden sm:block">
          Explore the Top 50 Cryptocurrencies
        </span>
        <span className=" sm:hidden block text-[1.7rem] py-2 text-center bg-gray-800 text-green-100 p-[0.40rem] rounded-md font-serif">
          Top 50 Cryptocurrencies
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
        <span className="w-full block md:inline-block text-center md:text-right -mt-6 mb-3">
          <button
            onClick={handleShowAllCoins}
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Show All Coins
          </button>
        </span>
      )}

      {/* Conditional rendering based on search error */}

      {searchError && (
        <div className="md:w-[35rem] md:h-[15rem] h-[16m] text-center block mx-auto relative md:bottom-[2rem] mb-56">
          <div className="md:w-[30rem] text-center bg-red-500 border border-red-700 rounded-md mx-auto">
            <p className="text-red-100 text-lg md:text-xl font-mono">
              Oops! No matching coins found.
            </p>
            <img
              src="src/assets/2748558.png"
              alt="Error Illustration"
              className="w-40 h-40 mx-auto mb-2 md:mb-2"
            />
            <p className="text-base md:text-base pb-2">
              Please check your search criteria and try again.
            </p>
          </div>
        </div>
      )}

      {/* Grid of filtered coins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredCoins.map((coin, index) => (
          <div
            key={index}
            className="w-64 h-[17rem] rounded overflow-hidden shadow-lg hover:shadow-2xl bg-gray-800 transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col mx-auto my-4"
          >
            <div className="mt-1 mx-auto">
              <img
                className="object-cover border-2 border-gray-900 rounded-full w-20 h-20"
                src={coin.iconUrl}
                alt="coin-logo"
              />
            </div>
            <div className="mt-3 px-6 pr-4 leading-loose flex-1">
              <p className="font-semibold text-2xl mb-2">{coin.name}</p>
              <p className="text-white text-base font-bold">
                Price:{" "}
                <span className="text-white text-base">
                  ${millify(coin.price)}
                </span>
              </p>
              <p className="text-gray-300 text-base font-bold">
                Rank: <span className="text-white text-base">{coin.rank}</span>
              </p>
              <p className="text-gray-300 text-base font-bold">
                Market Cap:{" "}
                <span className="text-white text-base">
                  ${millify(coin.marketCap)}
                </span>
              </p>
              <p className="text-gray-300 font-bold text-base">
                Daily Changes:{" "}
                <span className="text-white text-base">
                  {millify(coin.change)}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
