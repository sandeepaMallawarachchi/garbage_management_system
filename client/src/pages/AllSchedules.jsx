import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const AllSchedules = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      type: 'Organic',
      scheduleType: 'General',
      date: '2024-10-20',
      remarks: 'Pick up from front porch',
      paymentMethod: 'E-Wallet',
      total: 500,
    },
    {
      id: 2,
      type: 'Recyclable',
      scheduleType: 'Special',
      date: '2024-10-25',
      remarks: 'Take the bins from the garage',
      paymentMethod: 'Credit/Debit Card',
      total: 750,
    },
    {
      id: 3,
      type: 'E-waste',
      scheduleType: 'General',
      date: '2024-10-30',
      remarks: 'Collect at the driveway',
      paymentMethod: 'Cash on Visit',
      total: 500,
    },
  ]);

  const handleUpdate = (id) => {
    console.log(`Update schedule with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete schedule with ID: ${id}`);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handlePay = (id) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule.paymentMethod === 'Credit/Debit Card') {
      const payment = {
        sandbox: true,
        merchant_id: '1228428', // Replace with your PayHere Merchant ID
        return_url: undefined,
        cancel_url: undefined,
        notify_url: 'http://localhost:4000/customer/notify',
        order_id: id.toString(),
        items: schedule.type,
        amount: schedule.total,
        currency: 'LKR',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '0771234567',
        address: 'No.1, Galle Road, Colombo',
        city: 'Colombo',
        country: 'Sri Lanka',
      };

      if (window.payhere) {
        window.payhere.startPayment(payment);
      } else {
        console.error('PayHere SDK not loaded');
      }
    }
  };

  return (
    <div className="p-20 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Scheduled Waste Collections</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Schedule Type</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Remarks</Table.HeadCell>
          <Table.HeadCell>Payment Method</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {schedules.map((schedule) => (
            <Table.Row key={schedule.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {schedule.type}
              </Table.Cell>
              <Table.Cell>{schedule.scheduleType}</Table.Cell>
              <Table.Cell>{schedule.date}</Table.Cell>
              <Table.Cell>{schedule.remarks}</Table.Cell>
              <Table.Cell>{schedule.paymentMethod}</Table.Cell>
              <Table.Cell>{schedule.total} Rupees</Table.Cell>
              <Table.Cell>
                <a onClick={() => handleUpdate(schedule.id)} className="font-medium cursor-pointer">
                  <HiPencil className="inline-block w-7 h-7 text-green-500" />
                </a>
                <a onClick={() => handleDelete(schedule.id)} className="font-medium ml-4 cursor-pointer">
                  <HiTrash className="inline-block w-7 h-7 text-red-500" />
                </a>
                <a
                  onClick={() => handlePay(schedule.id)}
                  className="font-medium bg-green-600 text-white p-2 px-3 rounded-2xl hover:bg-green-700 ml-4 cursor-pointer"
                >
                  Pay
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllSchedules;