import React, { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiLockClosed, HiUser, HiPhone, HiHome, HiX } from "react-icons/hi";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await axios.post("http://localhost:4000/admin/register", {
                name,
                email,
                password,
                phone,
                address,
            });
            navigate("/login");
        } catch (error) {
            alert("Registration failed! Please try again.");
        }
    };

    const sendData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/admin/login", {
                email,
                password,
            });
            const adminID = res.data.admin.adminID;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("adminID", adminID);
            navigate(`/admin/admindashboard`);
        } catch (error) {
            alert("Login failed! Invalid email or password.");
        }
    };

    const handleToggle = () => {
        setIsRegistering(!isRegistering);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                >
                    <HiX className="w-6 h-6" />
                </button>
                {isRegistering ? (
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                        <div>
                            <Label htmlFor="name" value="Your Name" />
                            <TextInput
                                id="name"
                                type="text"
                                icon={HiUser}
                                placeholder="Your Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="registerEmail" value="Your email" />
                            <TextInput
                                id="registerEmail"
                                type="email"
                                icon={HiMail}
                                placeholder="name@example.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Label htmlFor="registerPassword" value="Password" />
                            <TextInput
                                id="registerPassword"
                                type={showPassword ? "text" : "password"}
                                icon={HiLockClosed}
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-10 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VscEye /> : <VscEyeClosed />}
                            </button>
                        </div>
                        <div className="relative">
                            <Label htmlFor="confirmPassword" value="Confirm Password" />
                            <TextInput
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                icon={HiLockClosed}
                                placeholder="Confirm Password"
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-10 focus:outline-none"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <VscEye /> : <VscEyeClosed />}
                            </button>
                        </div>
                        <div>
                            <Label htmlFor="phone" value="Phone" />
                            <TextInput
                                id="phone"
                                type="tel"
                                icon={HiPhone}
                                placeholder="Phone number"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                type="text"
                                icon={HiHome}
                                placeholder="Your address"
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                        >
                            Register
                        </Button>
                        <div>
                            <span>Already have an account?</span>
                            <span
                                className="text-green-600 underline cursor-pointer ml-2"
                                onClick={handleToggle}
                            >
                                Login
                            </span>
                        </div>
                    </form>
                ) : (
                    <form className="flex flex-col gap-4" onSubmit={sendData}>
                        <div>
                            <Label htmlFor="email" value="Your email" />
                            <TextInput
                                id="email"
                                type="email"
                                icon={HiMail}
                                placeholder="name@example.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Label htmlFor="password" value="Your password" />
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                icon={HiLockClosed}
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-10 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VscEye /> : <VscEyeClosed />}
                            </button>
                        </div>
                        <Button
                            type="submit"
                            className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                        >
                            Login
                        </Button>
                        <div>
                            <span>Don't have an account?</span>
                            <span
                                className="text-green-600 underline ml-2 cursor-pointer"
                                onClick={handleToggle}
                            >
                                Register
                            </span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
