import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea, Radio, Select } from "flowbite-react";
import schedulebg from '../images/schedulebg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WasteSchedule = () => {
    const [scheduleType, setScheduleType] = useState('general');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const cusID = localStorage.getItem("cusID");
    const [price, setPrice] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/admin/getPriceAmount/${scheduleType}`);
                setPrice(res.data.price || '');
                setMaxAmount(res.data.amount || '');
            } catch {
                setPrice('');
                setMaxAmount('');
            }
        };
        fetchScheduleDetails();
    }, [scheduleType]);

    useEffect(() => {
        if (!cusID) {
            alert("Customer ID not found, please login again.");
            navigate("/login");
        } else {
            const fetchAddress = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/customer/getCustomer/${cusID}`);
                    setAddress(response.data.address);
                } catch {
                    console.log('Error fetching address data');
                }
            };
            fetchAddress();
        }
    }, [cusID, navigate]);

    const handleScheduleChange = (e) => {
        const value = e.target.value;
        setScheduleType(value);
        setShowDate(value === 'special');
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

        if (Number(amount) > Number(maxAmount)) {
            alert(`Amount cannot exceed ${maxAmount} KG.`);
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
            alert('Error scheduling a collection!');
        }
    };

    const totalPayment = price;

    return (
        <div className="flex items-center justify-between h-screen my-10">
            <div className="flex-1">
                <img src={schedulebg} alt="schedule background" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 p-8">
                <form className="flex max-w-xl flex-col gap-4" onSubmit={handleForm}>
                    <div>
                        <Label value="Schedule Type" />
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
                    {showDate && (
                        <div>
                            <Label htmlFor="date" value="Select Date" />
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
                    <p className="mb-2 text-green-600 text-2xl">Max Amount: {maxAmount} KG</p>
                    <div>
                        <Label htmlFor="type" value="Waste Type" />
                        <Select id="type" required shadow>
                            <option value="">Select waste type</option>
                            <option value="organic">Organic</option>
                            <option value="recyclable">Recyclable</option>
                            <option value="eWaste">E-waste</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="address" value="Address" />
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
                        <Label htmlFor="amount" value="Amount (KG)" />
                        <TextInput
                            id="amount"
                            type="number"
                            placeholder="Amount of waste (Approximately)"
                            max={maxAmount}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            shadow
                        />
                    </div>
                    <div>
                        <Label htmlFor="remarks" value="Remarks" />
                        <Textarea id="remarks" placeholder="Additional comments" shadow />
                    </div>
                    <Label value="Select Payment Method" />
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
};

export default WasteSchedule;