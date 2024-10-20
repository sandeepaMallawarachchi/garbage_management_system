import React from 'react';
import { Card } from "flowbite-react";
import mainImg from '../images/hero.jpg';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';
import cardbg1 from '../images/cardbg1.png';
import cardbg2 from '../images/cardbg2.png';
import cardbg3 from '../images/cardbg3.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* main */}
            <div className="flex items-center justify-center min-h-screen px-10">
                <div className="flex flex-col md:flex-row items-center w-full max-w-7xl">
                    <div className="flex-1 md:mr-10 space-y-10">
                        <h1 className='text-8xl font-bold text-green-600 mb-4'>Green Bin</h1>
                        <p className='text-green-500 mb-6'>
                            Welcome to the Waste Management System! Here, you can effortlessly schedule waste collection, manage your requests,
                            and choose the appropriate disposal methods for your waste. Whether it's organic, recyclable, or electronic waste,
                            we offer both general and special collection services to suit your needs. Our goal is to make waste disposal easy, efficient,
                            and eco-friendly. Keep your environment clean with just a few clicks!
                        </p>
                        <button className='bg-green-600 hover:bg-gray-700 text-white p-2 px-4 rounded-full'>
                            Get Started
                        </button>
                    </div>

                    <div className="flex-1">
                        <img src={mainImg} alt="main img" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="flex justify-center items-center my-20">
                <div className="relative flex flex-row space-x-10 cursor-pointer">
                    <Link to={'/wasteSchedule'}><div className="relative z-10">
                        <Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card1} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Schedule Waste Collection
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </div></Link>

                    <div className="relative z-20">
                        <Link to={'/allSchedules'}><Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card2} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                All Schedules
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card></Link>
                    </div>

                    <div className="relative z-30">
                        <Link to={'/wasteLevels'}><Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card3} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Waste Levels
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
