import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import contact from '../images/contact.png';
import axios from 'axios';

const Contact = () => {
    
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleForm = async (e) => {  
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/customer/contact', {
                email,
                subject,
                message
            });
            console.log(res.data);
            alert('Message sent successfully');
        }
        catch (error) {
            console.log(error);
            alert('Failed to send message');
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-screen my-10 px-20">
            <div className="w-full md:flex-1 text-green-700">
                <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                <img src={contact} alt="schedule background" className="w-80 h-auto max-w-md rounded-lg shadow-lg mb-4" />
                <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +123 456 7890</p>
                <p className="flex items-center mb-4"><FaEnvelope className="mr-2" /> contact@example.com</p>
                <div className="social-icons flex space-x-4">
                    <FaFacebook className="text-blue-600" size={24} />
                    <FaGithub className="text-black" size={24} />
                    <FaLinkedin className="text-blue-700" size={24} />
                </div>
            </div>
            <div className="w-full md:flex-1 p-8">
                <form className="flex max-w-xl flex-col gap-4" onSubmit={handleForm}>
                    <div className="form-group mb-4">
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</Label>
                        <TextInput
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <Label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</Label>
                        <TextInput
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            placeholder='Enter your subject'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <Label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</Label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            placeholder='Enter your message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></Textarea>
                    </div>
                    <Button
                        type="submit"
                        className="mt-3 text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;