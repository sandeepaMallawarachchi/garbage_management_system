import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea, Radio, Select } from "flowbite-react";
import schedulebg from '../images/schedulebg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WasteSchedule = () => {
    const [scheduleType, setScheduleType] = useState('general');
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const cusID = localStorage.getItem("cusID");

    useEffect(() => {
        if (!cusID) {
            alert("Customer ID not found, please login again.");
            navigate("/login");
        } else {
            const fetchAddress = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/customer/getCustomer/${cusID}`);
                    setAddress(response.data.address);
                } catch (err) {
                    console.log('Error fetching address data');
                }
            };
            fetchAddress();
        }
    }, [cusID, navigate]);

    const handleScheduleChange = (e) => {
        const value = e.target.value;
        setScheduleType(value);
        setShowPayment(value === 'special');

        if (value === 'general') {
            setDate('');
            setPaymentMethod('');
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();

        if (scheduleType === 'special' && !paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        const scheduleData = {
            wasteType: document.getElementById("type").value,
            address: document.getElementById("address").value,
            amount: document.getElementById("amount").value,
            remarks: document.getElementById("remarks").value,
            date: scheduleType === 'general' ? null : (date ? new Date(date) : null),
            scheduleType: scheduleType,
            paymentMethod: paymentMethod,
            price: totalPayment,
        };

        try {
            const response = await fetch(`http://localhost:4000/customer/addSchedule/${cusID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to schedule collection: ${errorText}`);
            }

            const result = await response.json();
            alert('Successfully scheduled the collection');
        } catch (error) {
            console.error('Error:', error);
            alert('Error scheduling a collection! ');
        }
    }

    const basePayment = 500;
    const additionalPayment = scheduleType === 'special' ? 250 : 0;
    const totalPayment = basePayment + additionalPayment;

    return (
        <div className="flex items-center justify-between h-screen my-20">
            <div className="flex-1">
                <img src={schedulebg} alt="schedule background" className="object-cover w-full h-full" />
            </div>

            <div className="flex-1 p-8">
                <form className="flex max-w-xl flex-col gap-4" onSubmit={handleForm}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="Waste Type" />
                        </div>
                        <Select id="type" required shadow>
                            <option value="">Select waste type</option>
                            <option value="organic">Organic</option>
                            <option value="recyclable">Recyclable</option>
                            <option value="ewaste">E-waste</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <TextInput
                            id="address"
                            type="text"
                            placeholder="Your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            shadow
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount (KG)" />
                        </div>
                        <TextInput id="amount" type="text" placeholder="Amount of waste (Approximately)" required shadow />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="remarks" value="Remarks" />
                        </div>
                        <Textarea id="remarks" placeholder="Additional comments" shadow />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label value="Schedule Type" />
                        </div>
                        <div className="flex gap-4">
                            <label htmlFor="general" className="flex items-center gap-2">
                                <Radio
                                    id="general"
                                    name="scheduleType"
                                    value="general"
                                    checked={scheduleType === 'general'}
                                    onChange={handleScheduleChange}
                                />
                                General Schedule
                            </label>

                            <label htmlFor="special" className="flex items-center gap-2">
                                <Radio
                                    id="special"
                                    name="scheduleType"
                                    value="special"
                                    checked={scheduleType === 'special'}
                                    onChange={handleScheduleChange}
                                />
                                Special Schedule
                            </label>
                        </div>
                    </div>

                    {showPayment && (
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Select Date" />
                            </div>
                            <TextInput
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                shadow
                            />
                        </div>
                    )}

                    <p className="mb-2 text-green-600 text-2xl">Payment: {totalPayment} Rupees</p>
                    {showPayment && (
                        <>
                            <div className="mb-2">
                                <Label value="Select Payment Method" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="card" className="flex items-center gap-2">
                                    <Radio
                                        id="card"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    Credit/Debit Card
                                </label>

                                <label htmlFor="cash" className="flex items-center gap-2">
                                    <Radio
                                        id="cash"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod('cash')}
                                    />
                                    Cash on Visit
                                </label>
                            </div>
                        </>
                    )}

                    <Button
                        type="submit"
                        className="mt-3 text-sm px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 rounded-full"
                    >
                        Schedule
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default WasteSchedule;