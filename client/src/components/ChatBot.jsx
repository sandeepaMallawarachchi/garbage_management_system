import React, { useEffect, useState } from "react";
import { HiX, HiPaperAirplane } from "react-icons/hi";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import bot from '../images/bot.png';
import avatar from '../images/avatar.png';

const ChatBot = ({ onClose }) => {
    const [userMessage, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        // Check if the welcome message is already shown
        if (chatHistory.length === 0) {
            setChatHistory((prev) => [
                ...prev,
                { sender: "bot", text: "Hello! How can I assist you today?" }
            ]);
        }
    }, [chatHistory]);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!userMessage.trim()) return;

        setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

        try {
            const response = await axios.post("http://localhost:4000/chatbot/chat", {
                userMessage,
            });

            const botResponse = response.data.response || "Sorry, I didn't understand that.";
            setChatHistory((prev) => [...prev, { sender: "bot", text: botResponse }]);
            setMessage("");
        } catch (error) {
            setChatHistory((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
        }
    };

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
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}
                        >
                            <div className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.sender === "user" && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600">
                                            {msg.text}
                                        </span>
                                        <img
                                            src={avatar}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                    </div>
                                )}
                                {msg.sender === "bot" && (
                                    <div className="flex items-center gap-2 w-4/5">
                                        <img
                                            src={bot}
                                            alt="bot"
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span className="text-green-600">
                                            {msg.text}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <TextInput
                        id="message"
                        type="text"
                        placeholder="Your message"
                        required
                        className="flex-grow"
                        value={userMessage}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                    >
                        <HiPaperAirplane />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;