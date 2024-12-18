import React, { useState } from 'react';
import { Card } from "flowbite-react";
import mainImg from '../images/hero.jpg';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';
import cardbg1 from '../images/cardbg1.png';
import cardbg2 from '../images/cardbg2.png';
import cardbg3 from '../images/cardbg3.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthModel from "../components/AuthModel";

const Home = () => {
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (!token) {
            handleOpenModal();
        } else {
            navigate('/wasteSchedule');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen">
            {/* Main Section */}
            <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-10">
                <div className="flex-1 space-y-6 md:mr-10 md:text-left">
                    <h1 className="text-6xl sm:text-5xl lg:text-8xl font-bold text-green-600 mb-4">Green Bin</h1>
                    <p className="text-base sm:text-md lg:text-md text-green-500 mb-6">
                        Welcome to the Waste Management System! Here, you can effortlessly schedule waste collection, manage your requests,
                        and choose the appropriate disposal methods for your waste. Whether it's organic, recyclable, or electronic waste,
                        we offer both general and special collection services to suit your needs. Our goal is to make waste disposal easy, efficient,
                        and eco-friendly. Keep your environment clean with just a few clicks!
                    </p>
                    <button
                        onClick={() => handleGetStarted()}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 px-4 rounded-full"
                    >
                        Get Started
                    </button>
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                    <img src={mainImg} alt="main img" className="w-full h-auto max-h-[600px] object-cover rounded-md" />
                </div>
            </div>

            {/* Cards Section */}
            <div className="flex flex-wrap justify-center items-center gap-6 my-20 px-4">
                <Link to={'/wasteSchedule'} className="w-full sm:w-[calc(33%-1rem)] max-w-sm">
                    <Card className="bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <img src={card1} alt="schedule" className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Schedule Waste Collection
                        </h5>
                        <p className="text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
                </Link>
                <Link to={'/allSchedules'} className="w-full sm:w-[calc(33%-1rem)] max-w-sm">
                    <Card className="bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <img src={card2} alt="all schedules" className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            All Schedules
                        </h5>
                        <p className="text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
                </Link>
                <Link to={'/wasteLevels'} className="w-full sm:w-[calc(33%-1rem)] max-w-sm">
                    <Card className="bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <img src={card3} alt="waste levels" className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Waste Levels
                        </h5>
                        <p className="text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
                </Link>
            </div>
            <AuthModel isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Home;
