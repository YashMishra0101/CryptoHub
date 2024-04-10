import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDb } from "../firebase/FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore"; // Import firestore functions for writing data

import toast from "react-hot-toast";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setShowPassword(!showPassword);
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			try {
				// Create user with email and password
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const userUID = userCredential.user.uid;

				// Extract the user's unique ID based on email
				const uniqueID = email.split("@")[0]; // Using email prefix as the unique ID

				// Store user information in Firebase Authentication
				await setDoc(doc(fireDb, "users", userUID), {
					// Storing user data in Firestore
					name: name,
					email: email,
					uniqueID: uniqueID,
				});

				toast.success("Signup Successful");
				navigate("/login");
			} catch (error) {
				toast.error("Enter Valid Detail");
				console.error(`Signup failed: ${error.message}`);
			}
		} else {
			toast.error("Password not matched");
		}
	};

	return (
		<div className="bg-gray-900 min-h-[43rem]">
			<div className="flex flex-col items-center justify-center px-6 py-5 md:py-8 mx-auto md:h-screen lg:py-0 relative top-12 ">
				<div className="w-full rounded-lg shadow md:mt-5 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 ">
					<div className="pr-4 pl-4 space-y-4 pt-5 pb-3">
						<h1 className="text-center font-bold text-2xl text-white pt-2">
							Create account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-base font-medium text-white">
									Your name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									autoComplete="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Enter Your Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-base font-medium text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									autoComplete="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@gmail.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-base font-medium text-white">
									Password
								</label>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									autoComplete="new-password"
									placeholder="••••••••"
									className="  border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
									Confirm password
								</label>
								<input
									type={showPassword ? "text" : "password"}
									name="confirm-password"
									id="confirm-password"
									autoComplete="new-password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
							<div className="flex items-center">
								<div className="flex items-center h-5">
									<input
										id="show-password"
										type="checkbox"
										onChange={handleCheckboxChange}
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
									/>
								</div>
								<div className="ml-2 text-base md:mb-1">
									<label
										htmlFor="show-password"
										className="font-medium text-primary-600  text-blue-500 cursor-pointer">
										Show Password
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Create an account
							</button>
							<p className="text-base font-light text-gray-500 dark:text-gray-400 cursor-pointer">
								Already have an account?{" "}
								<span
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									onClick={() => navigate("/login")}>
									Login here
								</span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
