import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';

const WasteTruckSchedules = () => {
    const [acceptedSchedules, setAcceptedSchedules] = useState([]);

    useEffect(() => {
        const fetchAcceptedSchedules = async () => {
            try {
                const response = await axios.get('https://garbage-management-system-server.vercel.app/customer/getAcceptedSchedules');
                const { scheduleDetails } = response.data;

                setAcceptedSchedules(scheduleDetails);
            } catch (error) {
                console.log('Error fetching accepted schedules:', error);
            }
        };

        fetchAcceptedSchedules();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Waste Truck Dashboard</h2>
            <div>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Schedule ID</Table.HeadCell>
                        <Table.HeadCell>Waste Type</Table.HeadCell>
                        <Table.HeadCell>Address</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Remarks</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {acceptedSchedules.map((schedule) => (
                            <Table.Row key={schedule.scheduleID}>
                                <Table.Cell>{schedule.scheduleID}</Table.Cell>
                                <Table.Cell>{schedule.wasteType}</Table.Cell>
                                <Table.Cell>{schedule.address}</Table.Cell>
                                <Table.Cell>{schedule.amount}</Table.Cell>
                                <Table.Cell>{new Date(schedule.date).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{schedule.remarks || '-'}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default WasteTruckSchedules;