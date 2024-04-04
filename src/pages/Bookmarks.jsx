import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fireDb } from "../firebase/FirebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import millify from "millify";

const Bookmarks = () => {
  const [bookmarkedCoins, setBookmarkedCoins] = useState([]);
  const userId = useSelector((state) => state && state.userId); // Add a check for state

  useEffect(() => {
    const fetchBookmarkedCoins = async () => {
      if (userId) {
        const q = query(
          collection(fireDb, "bookmarks"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const coins = [];
        querySnapshot.forEach((doc) => {
          const coinData = doc.data();
          coins.push({
            id: doc.id,
            name: coinData.name,
            price: coinData.price,
            coinId: coinData.coinId,
          });
        });
        setBookmarkedCoins(coins);
      }
    };

    fetchBookmarkedCoins();
  }, [userId]);

  return (
    <div className="w-screen overflow-hidden bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-8 hover:text-green-200 select-none">
        Bookmarked Cryptocurrencies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {bookmarkedCoins.map((coin) => (
          <div
            key={coin.id}
            className="rounded-xl border border-gray-800 p-3 bg-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex flex-col relative"
          >
            <div className="mt-1 mb-2 mx-auto">
              <p className="font-semibold text-xl mb-2">{coin.name}</p>
              <p className="text-white text-base font-bold">
                Price:{" "}
                <span className="text-white text-base leading-6">
                  ${millify(coin.price)}
                </span>
              </p>
              <p className="text-gray-300 font-bold text-base mt-2">
                Coin ID: {coin.coinId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;


