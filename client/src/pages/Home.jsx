import React from 'react';
import { Card } from "flowbite-react";
import mainImg from '../images/main.jpeg';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';
import cardbg1 from '../images/cardbg1.png';
import cardbg2 from '../images/cardbg2.png';
import cardbg3 from '../images/cardbg3.png';

const Home = () => {
    return (
        <div>
            {/* main */}
            <div className="flex items-center justify-center min-h-screen px-10">
                <div className="flex flex-col md:flex-row items-center w-full max-w-7xl">
                    <div className="flex-1 md:mr-10 space-y-10">
                        <h1 className='text-8xl font-bold text-green-600 mb-4'>Green Bin</h1>
                        <p className='text-green-500 mb-6'>
                            Lorem ipsum dolor sit amet. Quo nihil unde ex libero esse ut voluptas sint ut deserunt voluptatem.
                            Voluptas sint ut deserunt voluptatem.
                        </p>
                        <button className='bg-green-600 hover:bg-gray-700 text-white p-2 px-4 rounded-full'>
                            Get Started
                        </button>
                    </div>

                    <div className="flex-2">
                        <img src={mainImg} alt="main img" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="flex justify-center items-center my-20">
                <div className="relative flex flex-row space-x-10 cursor-pointer">
                    <div className="relative z-10">
                        <Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card1} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Schedule Waste Collection
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </div>

                    <div className="relative z-20">
                        <Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card2} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Make Payment
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </div>

                    <div className="relative z-30">
                        <Card className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${cardbg3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <img src={card3} alt="schedule" className="w-full h-48 object-cover rounded-lg" />
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Waste Levels
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
