import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import News from "../pages/News";
import { Home } from "../components";

const BING_NEWS_API_KEY = import.meta.env.VITE_BingNews_API_KEY;

const BingnewsApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",
        headers: {
          "X-RapidAPI-Key": BING_NEWS_API_KEY,
          "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setData(response?.data);
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
      <div className="min-h-screen min-w-full flex justify-center items-center pt-8">
        {loading ? (
          <Spinner />
        ) : window.location.pathname === "/news" ? (
          <News data={data} />
        ) : (
          <Home newsData={data} />
        )}
      </div>
    </div>
  );
};

export default BingnewsApi;
