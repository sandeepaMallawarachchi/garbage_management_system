import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Table } from 'flowbite-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WasteTruckDashboard = () => {
    const [acceptedSchedules, setAcceptedSchedules] = useState([]);
    const [chartData, setChartData] = useState({
        labels: ['Organic', 'Recyclable', 'E-waste'],
        datasets: [
            {
                label: 'Accepted Schedules',
                data: [0, 0, 0],
                backgroundColor: ['rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)'],
                borderColor: ['rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)'],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchAcceptedSchedules = async () => {
            try {
                const response = await axios.get('https://garbage-management-system-server.vercel.app/customer/getAcceptedSchedules');
                const { organicWaste, recyclableWaste, eWaste, scheduleDetails } = response.data;

                setAcceptedSchedules(scheduleDetails);

                const organicCount = scheduleDetails.filter(schedule => schedule.wasteType === 'organic').length;
                const recyclableCount = scheduleDetails.filter(schedule => schedule.wasteType === 'recyclable').length;
                const ewasteCount = scheduleDetails.filter(schedule => schedule.wasteType === 'eWaste').length;

                setChartData({
                    labels: ['Organic', 'Recyclable', 'E-waste'],
                    datasets: [
                        {
                            label: 'Accepted Schedules',
                            data: [organicCount, recyclableCount, ewasteCount],
                            bbackgroundColor: ['rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)'],
                            borderColor: ['rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)', 'rgba(75, 192, 75, 1)'],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.log('Error fetching accepted schedules:', error);
            }
        };

        fetchAcceptedSchedules();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Waste Truck Dashboard</h2>

            <div className="mb-8">
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Accepted Schedules by Waste Type' } } }} />
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">Accepted Schedules</h3>
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

export default WasteTruckDashboard;