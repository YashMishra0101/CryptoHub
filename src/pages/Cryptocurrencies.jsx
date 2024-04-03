import React, { useState, useEffect } from "react";
import millify from "millify";
import { FaSearchDollar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark } from "../redux/slice/cryptoSlice";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, fireDb } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const Cryptocurrencies = ({ data, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState(data.data.coins);
  const [searchError, setSearchError] = useState(false);
  const [showAllCoins, setShowAllCoins] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  
    const fetchBookmarks = async () => {
      if (userId) {
        const q = query(
          collection(fireDb, "bookmarks"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const bookmarksData = [];
        querySnapshot.forEach((doc) => {
          bookmarksData.push({ id: doc.id, ...doc.data() }); // Include document ID
        });
        dispatch({ type: "SET_BOOKMARKS", payload: bookmarksData });
      }
    };
  
    fetchBookmarks(); // Fetch bookmarks when the component mounts or refreshes
  
    return () => unsubscribe();
  }, [userId, dispatch]);
  

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCoins(filtered);
    setSearchError(filtered.length === 0);
    setShowAllCoins(true);
  };

  const handleShowAllCoins = () => {
    setFilteredCoins(coins);
    setShowAllCoins(false);
    setSearchError(false);
    setSearchQuery("");
  };

  const handleBookmark = async (coin) => {
    try {
      if (!userId) {
        throw new Error("User not logged in");
      }
  
      if (!coin || !coin.name || !coin.price) {
        throw new Error("Invalid coin data");
      }
  
      const isAlreadyBookmarked = bookmarks.some(
        (item) => item.name === coin.name
      );
      if (isAlreadyBookmarked) {
        toast.info("This coin is already bookmarked.");
        return;
      }
  
      const bookmarksRef = collection(fireDb, "bookmarks");
      await addDoc(bookmarksRef, {
        userId: userId,
        coinId: coin.uuid,
        name: coin.name,
        price: coin.price,
        createdAt: serverTimestamp(),
      });
      dispatch(addToBookmark(coin));
      toast.success("Bookmark saved successfully");
    } catch (error) {
      console.error("Error saving bookmark:", error);
      toast.error("Failed to save bookmark. Please try again later.");
    }
  };
  
  

  return (
    <div className="w-screen overflow-hidden bg-gray-900 p-6 text-white ">
      <h2 className="text-3xl font-bold text-center mb-8 hover:text-green-200 select-none">
        <span className="hidden sm:block">
          Explore the Top 50 Cryptocurrencies
        </span>
        <span className="sm:hidden block text-[1.7rem] py-2 text-center bg-gray-800 text-green-100 p-[0.40rem] rounded-md font-serif">
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
            className="text-white bg-gray-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Show All Coins
          </button>
        </span>
      )}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredCoins.map((coin, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-800 p-3 bg-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex flex-col relative"
          >
            <div className="absolute top-2 right-2 flex items-center">
              <span className="text-xs text-blue-400 ml-1">Not Bookmarked</span>
            </div>
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
                Rank: <span className="text-white text-base">{coin.rank}</span>
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
              {/* Displaying the UUID */}
              <p className="text-gray-300 font-bold text-base mt-2">
                UUID: {coin.uuid}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
