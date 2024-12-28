import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, TextInput, Select, Label, Radio } from 'flowbite-react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cusID = localStorage.getItem('cusID');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`https://garbage-management-system-server.vercel.app/customer/getAllSchedules/${cusID}`);
        setSchedules(response.data);
      } catch (err) {
        console.log('Error fetching data');
      }
    };

    fetchCollections();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this schedule?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://garbage-management-system-server.vercel.app/customer/deleteSchedule/${cusID}/${id}`);
        setSchedules(schedules.filter((schedule) => schedule.scheduleID !== id));
      } catch (error) {
        console.log('Error deleting schedule:', error);
      }
    }
  };

  const handleUpdate = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`https://garbage-management-system-server.vercel.app/customer/updateSchedule/${cusID}/${selectedSchedule.scheduleID}`, selectedSchedule);
      setIsModalOpen(false);
      setSelectedSchedule(null);

      const response = await axios.get(`https://garbage-management-system-server.vercel.app/customer/getAllSchedules/${cusID}`);
      setSchedules(response.data);
    } catch (error) {
      console.log('Error updating schedule:', error);
    }
  };

  const handlePay = (id) => {
    const schedule = schedules.find((s) => s.scheduleID === id);
    if (schedule.paymentMethod === 'card') {
      const payment = {
        sandbox: true,
        merchant_id: '1228428',
        notify_url: 'https://garbage-management-system-server.vercel.app/customer/notify',
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">Scheduled Waste Collections</h2>
        <Link to='/wasteSchedule'>
          <button
            className="font-medium bg-green-600 text-white p-2 px-3 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl hover:bg-green-700 cursor-pointer"
          >
            + Add Schedule
          </button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="min-w-full">
          <Table.Head>
            <Table.HeadCell>Schedule Type</Table.HeadCell>
            <Table.HeadCell>Waste Type</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Remarks</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {[...schedules].reverse().map((schedule) => (
              <Table.Row
                key={schedule.scheduleID}
                className={
                  schedule.status === "accepted"
                    ? "bg-green-100"
                    : schedule.status === "rejected"
                      ? "bg-red-100"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                }
              >
                <Table.Cell>{schedule.scheduleType}</Table.Cell>
                <Table.Cell>{schedule.wasteType}</Table.Cell>
                <Table.Cell>{schedule.date ? formatDate(schedule.date) : "Pending Date"}</Table.Cell>
                <Table.Cell>{schedule.remarks || '-'}</Table.Cell>
                <Table.Cell>{schedule.paymentMethod} payment</Table.Cell>
                <Table.Cell>{schedule.price} Rupees</Table.Cell>
                <Table.Cell>{schedule.status}</Table.Cell>
                <Table.Cell>
                  {(schedule.status !== 'accepted' && schedule.status !== 'rejected') ? (
                    <>
                      <a onClick={() => handleUpdate(schedule)} className="font-medium cursor-pointer">
                        <HiPencil className="inline-block w-7 h-7 text-green-500" />
                      </a>
                      <a onClick={() => handleDelete(schedule.scheduleID)} className="font-medium ml-4 cursor-pointer">
                        <HiTrash className="inline-block w-7 h-7 text-red-500" />
                      </a>
                    </>
                  ) : (
                    <span className="text-gray-400">No Actions</span>
                  )}

                  {schedule.paymentMethod === 'card' &&
                    (schedule.status === 'accepted' || schedule.status === 'pending') && (
                      <a
                        onClick={() => handlePay(schedule.scheduleID)}
                        className="font-medium bg-green-600 text-white p-2 px-3 rounded-2xl hover:bg-green-700 ml-4 cursor-pointer"
                      >
                        Pay
                      </a>
                    )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {selectedSchedule && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
          <Modal.Header>Update Schedule</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label value="Schedule Type" />
                <div className="flex gap-4">
                  <label htmlFor="general" className="flex items-center gap-2">
                    <Radio
                      id="general"
                      name="scheduleType"
                      value="general"
                      checked={selectedSchedule.scheduleType === 'general'}
                      onChange={(e) => setSelectedSchedule({ ...selectedSchedule, scheduleType: e.target.value })}
                    />
                    General Schedule
                  </label>
                  <label htmlFor="special" className="flex items-center gap-2">
                    <Radio
                      id="special"
                      name="scheduleType"
                      value="special"
                      checked={selectedSchedule.scheduleType === 'special'}
                      onChange={(e) => setSelectedSchedule({ ...selectedSchedule, scheduleType: e.target.value })}
                    />
                    Special Schedule
                  </label>
                </div>
              </div>

              <Select
                label="Waste Type"
                value={selectedSchedule.wasteType}
                onChange={(e) => setSelectedSchedule({ ...selectedSchedule, wasteType: e.target.value })}
              >
                <option value="">Select waste type</option>
                <option value="organic">Organic</option>
                <option value="recyclable">Recyclable</option>
                <option value="ewaste">E-waste</option>
              </Select>

              <TextInput
                label="Remarks"
                placeholder="Your remarks"
                value={selectedSchedule.remarks || ''}
                onChange={(e) => setSelectedSchedule({ ...selectedSchedule, remarks: e.target.value })}
              />

              <TextInput
                label="Date"
                type="date"
                value={formatDate(selectedSchedule.date)}
                onChange={(e) => setSelectedSchedule({ ...selectedSchedule, date: e.target.value })}
              />

              <div>
                <Label value="Payment Method" />
                <div className="flex gap-4">
                  <label htmlFor="card" className="flex items-center gap-2">
                    <Radio
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={selectedSchedule.paymentMethod === 'card'}
                      onChange={(e) => setSelectedSchedule({ ...selectedSchedule, paymentMethod: e.target.value })}
                    />
                    Credit/Debit Card
                  </label>
                  <label htmlFor="cash" className="flex items-center gap-2">
                    <Radio
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={selectedSchedule.paymentMethod === 'cash'}
                      onChange={(e) => setSelectedSchedule({ ...selectedSchedule, paymentMethod: e.target.value })}
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateSubmit}>Update</Button>
            <Button color="gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AllSchedules;