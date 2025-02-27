import React, { useState, useEffect } from 'react';
import { Button, Navbar, Dropdown } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png';
import AuthModel from "./AuthModel";
import axios from 'axios';
import QRModal from './QRModal';
import { HiQrcode } from "react-icons/hi";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const cusID = localStorage.getItem('cusID');
    const [customer, setCustomer] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await axios.get(`https://garbage-management-system-server.vercel.app/customer/getCustomer/${cusID}`);
                setCustomer(res.data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        fetchCustomer();
    }, [cusID]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.clear();
            setIsLoggedIn(false);
            window.location.reload();
        }
    };

    const handleOpenQRModal = () => {
        setIsQRModalOpen(true);
    };

    const handleCloseQRModal = () => {
        setIsQRModalOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-lg lg:pl-10 lg:pr-10">
            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-green-700">Green Bin</span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    {isLoggedIn ? (
                        <div className='flex justify-between gap-5'>
                            <HiQrcode onClick={handleOpenQRModal} size={32} className='text-green-500 hover:text-green-600 cursor-pointer' />
                            <Dropdown inline label={
                                <div className="flex items-center gap-2">
                                    <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                    <span className="text-sm font-medium">{customer?.name}</span>
                                </div>
                            }>
                                <Dropdown.Item>
                                    <span onClick={handleLogout} className="cursor-pointer text-red-600 font-medium">Logout</span>
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    ) : (
                        <Button
                            onClick={handleOpenModal}
                            className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                        >
                            Login
                        </Button>
                    )}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        as={Link}
                        to="/"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/" ? "text-green-600" : ""}`}
                    >
                        Home
                    </Navbar.Link>

                    {isLoggedIn ? (
                        <Dropdown
                            label="Services"
                            inline={true}
                            className={`hover:text-green-600 w-64 text-sm sm:text-base ${location.pathname.startsWith("/allSchedules") ? "text-green-600" : ""}`}
                        >
                            <Dropdown.Item as={Link} to="/wasteSchedule">
                                Schedule Waste Collection
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/allSchedules">
                                All Schedules
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/wasteLevels">
                                Waste Levels
                            </Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <span className="text-gray-400 text-sm sm:text-base cursor-not-allowed">
                            Services (Login Required)
                        </span>
                    )}

                    <Navbar.Link
                        as={Link}
                        to="/about"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/about" ? "text-green-600" : ""}`}
                    >
                        About
                    </Navbar.Link>
                    <Navbar.Link
                        as={Link}
                        to="/contact"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/contact" ? "text-green-600" : ""}`}
                    >
                        Contact
                    </Navbar.Link>
                </Navbar.Collapse>

            </Navbar>
            <AuthModel isOpen={isModalOpen} onClose={handleCloseModal} />
            {isQRModalOpen && <QRModal onClose={handleCloseQRModal} />}
        </div>
    );
}

export default Header;