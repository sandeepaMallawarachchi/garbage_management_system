import React from "react";
import hero1 from "../images/hero.jpg";

const About = () => {
    const cards = [
        {
            title: "About Us",
            description:
                "Welcome to our Waste Management System! We are committed to providing sustainable and efficient solutions for waste collection and disposal. Our platform is designed to make managing your waste as easy as possible, ensuring a cleaner and greener environment.",
        },
        {
            title: "Our Mission",
            description:
                "Our mission is to revolutionize waste management by offering reliable, eco-friendly, and convenient waste disposal options. Whether you're dealing with organic waste, recyclables, or electronic waste, we have you covered.",
        },
        {
            title: "Why Choose Us?",
            description:
                "We provide sustainable, efficient, and innovative solutions for a greener future, ensuring all waste is managed responsibly and effectively.",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-10">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={hero1}
                    alt="Hero"
                    className="w-full h-auto max-w-md rounded-lg shadow-lg"
                />
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="space-y-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-md"
                        >
                            <h3 className="text-2xl font-bold text-green-700 mb-4">
                                {card.title}
                            </h3>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;