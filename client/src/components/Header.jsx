import React, { useState } from 'react';
import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import AuthModel from "./AuthModel";

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const location = useLocation();

    return (
        <div className="sticky top-0 z-50 bg-white shadow-lg lg:pl-10 lg:pr-10">
            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-green-700">Green Bin</span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Button
                        onClick={handleOpenModal}
                        className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                    >
                        Login
                    </Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        as={Link}
                        to="/"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/" ? "text-green-600" : ""
                            }`}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link
                        as={Link}
                        to="/services"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/services" ? "text-green-600" : ""
                            }`}
                    >
                        Services
                    </Navbar.Link>
                    <Navbar.Link
                        as={Link}
                        to="/about"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/about" ? "text-green-600" : ""
                            }`}
                    >
                        About
                    </Navbar.Link>
                    <Navbar.Link
                        as={Link}
                        to="/contact"
                        className={`hover:text-green-600 text-sm sm:text-base ${location.pathname === "/contact" ? "text-green-600" : ""
                            }`}
                    >
                        Contact
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            <AuthModel isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Header;
