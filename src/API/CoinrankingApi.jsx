import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Home from "../pages/Home"

const CoinrankingApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_Coinranking_API_KEY;

  const option = {
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
      "X-RapidAPI-Key":{API_KEY },
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios(option);
        console.log("Data in coinapi:",response);
        setData(response.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetch()
  }, []);

  return( 
  <div className="min-h-screen min-w-full flex justify-center items-center mb-5">
    {
      loading ? (<Spinner/>) : (<Home data={data} loading={loading}/>)
    }
  </div>
  )
};

export default CoinrankingApi;
