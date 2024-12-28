import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Select } from 'flowbite-react';
import axios from 'axios';

const UpdatePriceAndAmount = () => {
    const [scheduleType, setScheduleType] = useState('general');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (price <= 0 || amount <= 0) {
            setError('Price and amount must be positive values');
            return;
        }
        setError('');
        try {
            await axios.put(`https://garbage-management-system-server.vercel.app/admin/updatePriceAmount/${scheduleType}`, { price, amount });
            alert('Price and amount updated successfully');
        } catch {
            alert('Failed to update price and amount');
        }
    };

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            try {
                const res = await axios.get(`https://garbage-management-system-server.vercel.app/admin/getPriceAmount/${scheduleType}`);
                setPrice(res.data.price || '');
                setAmount(res.data.amount || '');
            } catch {
                setPrice('');
                setAmount('');
            }
        };
        fetchScheduleDetails();
    }, [scheduleType]);

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg">
                <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">Update Price and Amount</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="scheduleType" value="Schedule Type" />
                        <Select
                            id="scheduleType"
                            value={scheduleType}
                            onChange={(e) => setScheduleType(e.target.value)}
                            required
                        >
                            <option value="general">General</option>
                            <option value="special">Special</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="price" value="Price (LKR)" />
                        <TextInput
                            id="price"
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount" value="Maximum Amount (KG)" />
                        <TextInput
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <Button type="submit" className="w-full font-medium px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePriceAndAmount;