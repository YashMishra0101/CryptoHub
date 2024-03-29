import React, { useState } from "react";
import OpenAI from "openai";

const ChatGPT = () => {
	const [chatHistory, setChatHistory] = useState([]);
	const [botMessage, setBotMessage] = useState("");
	const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

	const openai = new OpenAI({
		apiKey,
		dangerouslyAllowBrowser: true, // Enable browser-like environment
	});

	const sendMessage = async (message) => {
		try {
			const response = await openai.chat.completions.create({
				messages: [{ role: "user", content: message }],
				model: "gpt-3.5-turbo",
			});

			response?.choices?.map((item) => {
				setBotMessage(item?.message?.content);
				setChatHistory([...chatHistory, { role: "bot", content: botMessage }]);
			});
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="flex flex-col h-screen justify-between pt-32">
			<div className="flex-grow p-4">
				{chatHistory &&
					chatHistory?.map((message, index) => (
						<div
							key={index}
							className={`mb-4 ${
								message.role === "user" ? "text-right" : "text-left"
							}`}>
							<div
								className={`inline-block px-4 py-2 rounded-lg ${
									message.role === "user"
										? "bg-blue-500 text-white"
										: "bg-gray-300"
								}`}>
								{message?.content}
							</div>
						</div>
					))}
			</div>
			<div className="p-4">
				<input
					type="text"
					placeholder="Type your message..."
					className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							sendMessage(e.target.value);
							e.target.value = "";
						}
					}}
				/>
			</div>
		</div>
	);
};

export default ChatGPT;
