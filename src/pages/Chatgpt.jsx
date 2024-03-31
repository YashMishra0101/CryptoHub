import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Markdown from "react-markdown";

const Chatgpt = () => {
	const [chatHistory, setChatHistory] = useState([]);

	const genAI = new GoogleGenerativeAI();
	// "" add api key here

	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	async function run(message) {
		setChatHistory((prevChatHistory) => [
			...prevChatHistory,
			{ role: "user", content: message },
		]);

		const prompt = message;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		if (response?.text) {
			setChatHistory((prevChatHistory) => [
				...prevChatHistory,
				{ role: "bot", content: text },
			]);
		} else {
			console.log("API NOT WORKING");
		}
	}

	return (
		<div>
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
									<Markdown>{message?.content}</Markdown>
								</div>
							</div>
						))}
				</div>
				<div className="p-4 ">
					<input
						type="text"
						placeholder="Type you query..."
						className="w-full  px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								run(e.target.value);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chatgpt;
