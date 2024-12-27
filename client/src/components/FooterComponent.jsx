import React from 'react'
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';

const FooterComponent = () => {
    return (
        <Footer container className='bg-[#8fcca2]'>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <Link to={'/'}>
                            <Footer.Brand
                                src={logo}
                                alt="Logo"
                                name='Green Bin'
                            />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="Links" className='text-black' />
                            <Footer.LinkGroup col className='text-black'>
                                <Footer.Link href="/">Home</Footer.Link>
                                <Footer.Link href="/about">About</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" className='text-black' />
                            <Footer.LinkGroup col className='text-black'>
                                <Footer.Link href="https://github.com/sandeepaMallawarachchi/garbage_management_system" target="_blank" rel="noopener noreferrer">Github</Footer.Link>
                                <Footer.Link href="https://www.linkedin.com/in/sandeepa-mallawarachchi/" target="_blank" rel="noopener noreferrer">LinkedIn</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" className='text-black' />
                            <Footer.LinkGroup col className='text-black'>
                                <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
                                <Footer.Link href="/terms">Terms &amp; Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="GreenBin" year={2024} className='text-black' />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} className='text-green-700' />
                        <Footer.Icon href="#" icon={BsInstagram} className='text-green-700' />
                        <Footer.Icon href="#" icon={BsTwitter} className='text-green-700' />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent