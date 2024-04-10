import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
	arrayUnion, // Import the deleteDoc function
} from "firebase/firestore"; // Make sure to import deleteDoc from the correct path
import millify from "millify";
import { onAuthStateChanged } from "firebase/auth";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

const Bookmarks = () => {
	const [bookmarkedCoins, setBookmarkedCoins] = useState([]);
	const [uId, setUId] = useState(null);
	const [deleted, setDeleted] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUId(user.reloadUserInfo.localId);
			}
		});
		const fetchBookmarkedCoins = async () => {
			if (uId) {
				onSnapshot(doc(fireDb, "users", uId), (doc) => {
					setBookmarkedCoins(doc.data()?.bookmarks);
					console.log(bookmarkedCoins);
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
			setBookmarkedCoins(newBookmarkedCoins); // Update state immediately

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
		<div className="w-screen overflow-hidden bg-gray-900 p-6 text-white">
			<h2 className="text-3xl font-bold text-center mb-8 hover:text-green-200 select-none">
				Bookmarked Cryptocurrencies
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
				{bookmarkedCoins.map((coin, index) => (
					<div
						key={index}
						className="rounded-xl border border-gray-800 p-3 bg-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex flex-col relative">
						<div className="absolute top-2 right-2 flex items-center">
							<MdDeleteOutline
								onClick={() => handleDeleteBookmark(coin)}
								className="text-2xl cursor-pointer"
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
								UUID: {coin.coinid}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Bookmarks;
