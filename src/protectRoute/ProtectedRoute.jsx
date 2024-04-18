// import { Navigate } from "react-router";
// import { useEffect, useState } from "react";
// import { auth } from "../firebase/FirebaseConfig";

// export const ProtectedRoute = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check if user is logged in using local storage
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user || userLoggedIn) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Return Navigate component if user is not logged in
//   if (!isLoggedIn) {
//     return <Navigate to={"/"} />;
//   }

//   // Return children if user is logged in
//   return children;
// };


import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  // Check if user data exists in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Return Navigate component if user data doesn't exist
  if (!user) {
    return <Navigate to={"/"} />;
  }

  // Return children if user data exists
  return children;
};

