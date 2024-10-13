import React from 'react';
import mainImg from '../images/main.jpeg';

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-10">
            <div className="flex flex-col md:flex-row items-center w-full max-w-7xl">
                <div className="flex-1 md:mr-10 space-y-10">
                    <h1 className='text-6xl font-bold text-green-600 mb-4'>Green Bin</h1>
                    <p className='text-green-500 mb-6'>
                        Lorem ipsum dolor sit amet. Quo nihil unde ex libero esse ut voluptas sint ut deserunt voluptatem.
                        Voluptas sint ut deserunt voluptatem.
                    </p>
                    <button className='bg-green-600 hover:bg-gray-500 text-white p-2 px-4 rounded-full'>
                        Get Started
                    </button>
                </div>

                <div className="flex-2">
                    <img src={mainImg} alt="main img" className="w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default Home;
