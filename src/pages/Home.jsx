import React from "react";
import millify from "millify";

const Home = ({ data ,loading}) => {
  let totalCoins = "N/A";
  let totalMarkets = "N/A";
  let totalExchanges = "N/A";
  let totalMarketCap = "N/A";
  console.log("Data in Home:",data);
  console.log("Data in Loading:",loading);


  // Check if data is available and has the expected structure
  if (data && data.status === "success" && data.data && data.data.stats) {
    const stats = data.data.stats;

    // Accessing specific properties
    totalCoins = stats.totalCoins;
    totalMarkets = stats.totalMarkets;
    totalExchanges = stats.totalExchanges;
    totalMarketCap = stats.totalMarketCap;

  }

  return (
    <div className="overflow-hidden">
    <div className="container w-screen">
    <div className="bg-gray-300 p-6 rounded-md shadow-md lg:mr-3">
       <h1 className="text-2xl font-sans font-bold mb-6 text-center text-gray-800">Global Crypto Status</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
          <p className="text-sm font-semibold text-gray-600 ">Total Cryptocurrencies</p>
          <p className="text-3xl text-green-700 font-medium">{millify(totalCoins)}</p>
        </div>
        <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
          <p className="text-sm font-semibold text-gray-600 ">Total Markets</p>
          <p className="text-3xl text-green-700 font-medium">{millify(totalMarkets)}</p>
        </div>
        <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
          <p className="text-sm font-semibold text-gray-600 ">Total Exchanges</p>
          <p className="text-3xl text-green-700 font-medium">{millify(totalExchanges)}</p>
        </div>
        <div className="hover:bg-blue-200 transition duration-300 ease-in-out bg-white p-4 rounded-md shadow-md text-center">
          <p className="text-sm font-semibold text-gray-600 ">Total MarketCap</p>
          <p className="text-3xl text-green-700 font-medium">{millify(totalMarketCap)}</p>
        </div>
      </div>
    </div>
  </div>



  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
    
  </div>

  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
  </div>

  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
  </div>

  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
  </div>

  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
  </div>

  <div class="max-w-72 max-h-72 rounded overflow-hidden shadow-lg bg-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-start mx-auto my-4">
    <div class="py-8 px-6 pr-4 leading-relaxed">
      <div class="font-semibold text-2xl -mt-6 mb-3 text-white leading-relaxed">Ethereum</div>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base text-white">Price:</span> 2,222,222
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Market Cap:</span> 55,555
      </p>
      <p class="text-gray-200 text-base">
        <span class="font-bold text-base">Daily Changes:</span> 8,888
      </p>
    </div>
    <div class="mt-3">
      <img
        class="w-20 h-20 object-cover border-2 border-white rounded-full"
        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        alt="coin-logo"
      />
    </div>
  </div>


</div>





  </div>
  );
};

export default Home;



