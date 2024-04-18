import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Markdown from "react-markdown";
import Spinner from "../components/Spinner"; // Import Spinner component
import Footer from "../components/Footer";
const AIBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const API_KEY = import.meta.env.VITE_Geemini_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    try {
      setLoading(true); // Set loading to true before sending message

      const prompt = inputValue;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (response?.text) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: "user", content: inputValue },
          { role: "bot", content: text },
        ]);
      } else {
        console.log("API NOT WORKING");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false); // Set loading to false after receiving response
    }

    setInputValue("");
  };

  return (
    <div
      className="flex flex-col justify-between min-h-screen"
      style={{ minHeight: `calc(100vh - 74px)` }}
    >
      <h1 className="text-3xl text-white font-sans font-bold mt-6 text-center select-none w-[95%] ml-2 md:ml-0">
        <span className="hover:text-green-400 transition duration-300 cursor-pointer">
          AI Chat Assistance -
        </span>
        <span className="text-sm font-normal text-gray-400 ml-1 hover:text-green-400 transition duration-300 cursor-pointer">
          Powered by Google Gemini
        </span>
      </h1>

      <div className="flex-grow p-4 overflow-y-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="min-h-screen min-w-full flex justify-center items-center relative bottom-28">
            <Spinner />
          </div>
        )}{" "}
        {/* Show spinner when loading */}
      </div>
      <div className="p-4 flex items-center relative bottom-0 min-w-full">
        <input
          type="text"
          placeholder="Type your query..."
          className="flex-grow px-4 py-2 4 rounded-lg border border-gray-300 focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 4 text-white rounded-lg focus:outline-none hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIBot;
