import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';

const QRDetails = () => {
    const { cusID } = useParams(); 
    const decodedCusID = decodeURIComponent(cusID);
    const decryptedCusID = CryptoJS.AES.decrypt(decodedCusID, 'your-secret-key').toString(CryptoJS.enc.Utf8);
    const [customer, setCustomer] = useState('');
    const [schedules, setSchedules] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchCustomer = async () => {
            const res = await axios.get(`http://localhost:4000/customer/getCustomer/${decryptedCusID}`);
            setCustomer(res.data);
        };

        const fetchSchedules = async () => {
            const res = await axios.get(`http://localhost:4000/customer/getAllSchedules/${decryptedCusID}`);
            setSchedules(res.data);
        };

        fetchCustomer();
        fetchSchedules();
    }, [cusID]);

    const scheduleTable = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        const formattedScheduleDate = scheduleDate.toISOString().split('T')[0];
        return schedule.status === 'accepted' && formattedScheduleDate === today;
    });

    return (
        <div className="p-20 overflow-x-auto">
            <div className="mb-4">
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold">Accepted Schedules</h3>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Schedule Type</Table.HeadCell>
                        <Table.HeadCell>Waste Type</Table.HeadCell>
                        <Table.HeadCell>Amount (KG)</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {scheduleTable.length > 0 ? scheduleTable.map((schedule, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{schedule.scheduleType}</Table.Cell>
                                <Table.Cell>{schedule.wasteType}</Table.Cell>
                                <Table.Cell>{schedule.amount}</Table.Cell>
                                <Table.Cell>{schedule.date ? new Date(schedule.date).toLocaleDateString() : 'N/A'}</Table.Cell>
                            </Table.Row>
                        )) : (
                            <Table.Row>
                                <Table.Cell colSpan={4}>No accepted schedules</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default QRDetails;