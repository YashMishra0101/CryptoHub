import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Home from "../pages/Home";
import Chart from '../pages/Chart'; // Import Chart component
import { Cryptocurrencies } from "../components";

const API_KEY = import.meta.env.VITE_Coinranking_API_KEY;

const CoinrankingApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sparklineData, setSparklineData] = useState([]);

  const fetchData = async () => {
    console.log("API KEY in Coinrankingapi:", API_KEY);

    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "1y",
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
      setData(response?.data);
      const sparkline = response?.data?.data?.coins?.map(coin => coin.sparkline)
      if (sparkline.length > 0) {
        setSparklineData(sparkline);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="min-h-screen min-w-full flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {window.location.pathname === "/cryptocurrencies" && (
              <Cryptocurrencies data={data} loading={loading} />
            )}
            {window.location.pathname === "/chart" && sparklineData && sparklineData.length > 0 && (
              <Chart sparklineData={sparklineData} />
            )}
            {window.location.pathname === "/" && (
              <Home data={data} loading={loading} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinrankingApi;
