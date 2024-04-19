import React, { useState, useEffect } from "react";
import { auth, fireDb } from "../firebase/FirebaseConfig";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import millify from "millify";
import { onAuthStateChanged } from "firebase/auth";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const Bookmarks = () => {
  const [bookmarkedCoins, setBookmarkedCoins] = useState([]);
  const [uId, setUId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUId(user.reloadUserInfo.localId);
      }
    });
    const fetchBookmarkedCoins = async () => {
      if (uId) {
        onSnapshot(doc(fireDb, "users", uId), (doc) => {
          setBookmarkedCoins(doc.data()?.bookmarks || []); // Ensure default value is an empty array if no bookmarks are available
          setLoading(false); // Set loading to false after fetching data
        });
      }
    };

    fetchBookmarkedCoins();
  }, [uId]);

  const handleDeleteBookmark = async (coin) => {
    try {
      const newBookmarkedCoins = bookmarkedCoins.filter(
        (item) => item.coinid !== coin.coinid
      );
      setBookmarkedCoins(newBookmarkedCoins);

      const ref = doc(fireDb, "users", uId);
      await updateDoc(ref, {
        bookmarks: newBookmarkedCoins,
      });

      toast.success("Bookmark deleted successfully");
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Failed to delete bookmark");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-8 hover:text-green-400 transition duration-300 cursor-pointer select-none">
        Bookmarked Cryptocurrencies
      </h2>

      {loading ? (
        <div className="min-h-screen min-w-full flex justify-center items-center relative bottom-28">
          <Spinner />
        </div>
      ) : bookmarkedCoins.length === 0 ? (
        <div className="mt-4 p-3 text-center bg-red-100 border border-red-400 rounded-md ml-4 mr-4">
          <p className="text-red-500 md:text-2xl font-mono">
            No Bookmarked coins Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {bookmarkedCoins.map((coin, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 p-3 bg-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex flex-col relative"
            >
              <div className="absolute top-2 right-2 flex items-center">
                <MdDeleteOutline
                  onClick={() => handleDeleteBookmark(coin)}
                  className="text-2xl cursor-pointer hover:text-red-600"
                />
              </div>
              <div className="mt-1 mb-2 mx-auto">
                <img
                  className="object-cover border-2 border-gray-800 rounded-full w-20 h-20"
                  src={coin.img}
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
                <p className="text-gray-300 font-bold text-base mt-2">
                  UUID: {coin.coinid}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
