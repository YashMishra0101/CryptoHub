import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Home from "../pages/Home";
import { Cryptocurrencies } from "../components";
const API_KEY = import.meta.env.VITE_Coinranking_API_KEY;

const CoinrankingApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("API KEY in Coinrankingapi:", API_KEY);

      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        console.log("Data in Coinrankingapi data", data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="min-h-screen min-w-full flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : window.location.pathname === "/cryptocurrencies" ? (
          <Cryptocurrencies data={data} loading={loading} />
        ) : (
          <Home data={data} loading={loading} />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default CoinrankingApi;
