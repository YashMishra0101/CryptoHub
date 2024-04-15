import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Markdown from "react-markdown";

const AIBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const genAI = new GoogleGenerativeAI('AIzaSyCZ-YrC_xmiPzXl8TwtQyos5OAsCQzOLKo'); // Replace 'YOUR_API_KEY_HERE' with your actual API key

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    try {
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
    }

    setInputValue("");
  };

  return (
    <div className="min-h-[39rem]  flex flex-col justify-between">
      <h1 className="text-3xl text-white font-sans font-bold mb-6 text-center">
          AI Chat Assistance
        </h1>
      <div className="flex-grow p-4 overflow-y-auto">
        
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center">
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
          className="ml-2 px-4 py-2 bg-blue-500 4 text-white rounded-lg focus:outline-none"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIBot;
