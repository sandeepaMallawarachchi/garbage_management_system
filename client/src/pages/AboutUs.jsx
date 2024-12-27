import React from 'react';

const AboutUs = () => {
    return (
        <div className="p-8 bg-green-50 text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-semibold mb-4 text-green-600">About Us</h1>
                <p className="text-lg mb-6">
                    Welcome to our Waste Management System! We are committed to providing sustainable and efficient solutions for waste collection and disposal. Our platform is designed to make managing your waste as easy as possible, all while ensuring a cleaner and greener environment for all.
                </p>

                <h2 className="text-3xl font-semibold mb-4 text-green-600">Our Mission</h2>
                <p className="text-lg mb-6">
                    Our mission is to revolutionize waste management by offering reliable, eco-friendly, and convenient waste disposal options. Whether you're dealing with organic waste, recyclables, or electronic waste, we provide flexible and customizable services to meet your specific needs. Our goal is to help you dispose of waste responsibly while promoting sustainability in our communities.
                </p>

                <h2 className="text-3xl font-semibold mb-4 text-green-600">Our Services</h2>
                <p className="text-lg mb-6">
                    We offer a range of services, including general and special waste collection, ensuring that every type of waste is disposed of safely and efficiently. With our easy-to-use platform, you can schedule waste pickups, track your requests, and choose the best disposal methods—all from the comfort of your home.
                </p>

                <h2 className="text-3xl font-semibold mb-4 text-green-600">Why Choose Us?</h2>
                <ul className="list-inside list-disc text-lg">
                    <li>Eco-friendly solutions for waste management</li>
                    <li>Efficient scheduling and collection services</li>
                    <li>Simple, user-friendly interface for managing requests</li>
                    <li>Comprehensive waste disposal methods for all types of waste</li>
                    <li>Commitment to sustainability and a cleaner environment</li>
                </ul>

                <div className="mt-8">
                    <p className="text-xl text-gray-600">
                        Join us in our journey to make the world a cleaner and greener place, one waste collection at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
