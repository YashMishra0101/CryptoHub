import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const News = ({ data, loading }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(
    Array(data?.data?.length || 0).fill(false)
  );

  const toggleDescription = (index) => {
    const updatedShowFullDescription = [...showFullDescription];
    updatedShowFullDescription[index] = !updatedShowFullDescription[index];
    setShowFullDescription(updatedShowFullDescription);
  };

  const formatPublishedDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div>
      {!data?.data?.length && !loading ? (
        <section className="bg-gray-900 text-white min-h-screen mt-10">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                API is not working
              </p>
              <p className="mb-4 text-lg text-center font-light text-gray-500 dark:text-gray-400">
                Sorry, <span className="font-semibold text-blue-700">News</span>{" "}
                page is not working
              </p>
              <a
                onClick={() => navigate("/")}
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gray-900 text-white min-h-screen">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-bold sm:text-4xl hover:text-green-300 select-none cursor-pointer">
                Top 50 Latest News about Cryptocurrencies
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data?.data?.map((value, index) => (
                <div
                  key={index}
                  className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={value.thumbnail}
                      alt={value.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-sm"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <h2 className="text-xl font-bold text-white mt-1">{`${value.title}.`}</h2>

                  <p className="mt-1 text-sm text-gray-300">
                    {showFullDescription[index] ||
                    value.description.length <= 100
                      ? value.description
                      : `${value.description.slice(0, 100)}...`}
                    {value.description.length > 100 && (
                      <button
                        className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
                        onClick={() => toggleDescription(index)}
                      >
                        {showFullDescription[index] ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Published on {formatPublishedDate(value.createdAt)}
                  </p>

                  <p className="mt-4 text-blue-500 hover:underline cursor-pointer">
                    <a
                      href={value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Show Full News
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default News;
