import React from "react";
import ReactMarkdown from "react-markdown";
import bot from '../../images/bot.png';
import avatar from '../../images/avatar.png';

const ChatHistory = ({ chatHistory }) => {
    return (
        <div>
            {chatHistory.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-4 text-sm ${msg.type === "user" ? "text-right" : "text-left"}`}
                >
                    <div className={`flex items-center ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.type === "user" && (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                </span>
                                <img
                                    src={avatar}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            </div>
                        )}
                        {msg.type === "bot" && (
                            <div className="flex items-center gap-2 w-5/6">
                                <img
                                    src={bot}
                                    alt="bot"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span className="text-green-600">
                                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;