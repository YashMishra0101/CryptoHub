// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Spinner from "../components/Spinner";
// import News from "../components";
// import { Cryptocurrencies } from "../components";
// const API_KEY = import.meta.env.VITE_Bingnews_API_KEY;

// const BingnewsApi = () => {
 
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         console.log("API KEY in Coinrankingapi:", API_KEY);
  
//         const options = {
//             method: 'GET',
//             url: 'https://bing-news-search1.p.rapidapi.com/news',
//             params: {
//               safeSearch: 'Off',
//               textFormat: 'Raw'
//             },
//             headers: {
//               'X-BingApis-SDK': 'true',
//               'X-RapidAPI-Key': API_KEY,
//               'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//             }
//           };
  
//         try {
//           const response = await axios.request(options);
//           setData(response.data);
//           console.log("Data in Bingnews api", data);
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     return (
//       <div>
//         <div className="min-h-screen min-w-full flex justify-center items-center">
//           {loading ? (
//             <Spinner />
//           ) : window.location.pathname === "/cryptocurrencies" ? (
//             <Cryptocurrencies data={data} loading={loading} />
//           ) : (
//             <News data={data} loading={loading} />
//           )}
//         </div>
//         <div></div>
//       </div>
//     );
  
// }

// export default BingnewsApi

