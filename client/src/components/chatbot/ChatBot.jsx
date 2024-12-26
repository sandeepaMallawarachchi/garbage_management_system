import React, { useState } from "react";
import { HiX, HiPaperAirplane } from "react-icons/hi";
import { Button, TextInput } from "flowbite-react";
import bot from '../../images/bot.png';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const ChatBot = ({ onClose }) => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState(null);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI("AIzaSyARmGCKVoxWS7Diw_56kygnqMbWSP3htqg");

    const initializeChatSession = async () => {
        if (!chatSession) {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const session = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello" }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Hi there! How can I assist you today?" }],
                    },
                ],
            });
            setChatSession(session);

            // Add initial responses to the chat history
            setChatHistory([
                { type: "user", message: "Hello" },
                { type: "bot", message: "Hi there! How can I assist you today?" },
            ]);
        }
    };

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (userInput.trim() === "") return;
        if (!chatSession) await initializeChatSession();

        setIsLoading(true);
        try {
            const result = await chatSession.sendMessage(userInput);
            const response = result.response.text();

            setChatHistory([
                ...chatHistory,
                { type: "user", message: userInput },
                { type: "bot", message: response },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory([
                ...chatHistory,
                { type: "user", message: userInput },
                { type: "bot", message: "Sorry, something went wrong. Please try again." },
            ]);
        } finally {
            setUserInput("");
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        initializeChatSession();
    }, []);

    return (
        <div className="fixed bottom-0 right-0 flex items-end justify-end z-50 p-4 w-[450px] max-w-[450px]">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold mb-4 flex items-center text-green-600">
                        <img src={bot} alt="bot" className="w-12 mr-2" />
                        BinBuddy
                    </h1>
                    <HiX onClick={onClose} size={24} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
                </div>

                <div className="h-64 overflow-y-auto border rounded p-2 mb-4">
                    <ChatHistory chatHistory={chatHistory} />
                    <Loading isLoading={isLoading} />
                </div>

                <div className="flex items-center gap-2">
                    <TextInput
                        id="message"
                        type="text"
                        placeholder="Your message"
                        required
                        className="flex-grow"
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                    >
                        <HiPaperAirplane />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;