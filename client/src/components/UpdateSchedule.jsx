import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";

export function UpdateSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateInputs, setDateInputs] = useState({}); 

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customer/get/all');

        const allSchedules = response.data.flatMap(customer =>
          customer.schedules.map(schedule => ({
            ...schedule,
            cusID: customer.cusID
          }))
        );

        const pendingSchedules = allSchedules.filter(schedule => schedule.status === 'pending');

        setSchedules(pendingSchedules);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleStatusUpdate = async (scheduleID, status, cusID) => {
    const newDate = dateInputs[scheduleID];

    try {
      console.log(`http://localhost:4000/customer/${status}/${cusID}/${scheduleID}`);
      
      await axios.put(`http://localhost:4000/customer/${status}/${cusID}/${scheduleID}`, { 
        status,
        ...(newDate && { date: newDate })
      });

      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.scheduleID === scheduleID
            ? { ...schedule, status, date: newDate || schedule.date }
            : schedule
        )
      );

      if (newDate) {
        setDateInputs((prev) => ({ ...prev, [scheduleID]: '' }));
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Pending Schedules</h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Schedule ID</Table.HeadCell>
          <Table.HeadCell>Waste Type</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {schedules.map((schedule) => (
            <Table.Row key={schedule.scheduleID} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {schedule.scheduleID}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                {schedule.wasteType}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                {schedule.address}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                {schedule.amount}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                {schedule.date === null ? (
                  <input
                    type="date"
                    onChange={(e) => setDateInputs((prev) => ({ ...prev, [schedule.scheduleID]: e.target.value }))} 
                    value={dateInputs[schedule.scheduleID] || ''}
                    className="border border-gray-300 rounded py-1 px-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out w-36" 
                    aria-label="Update Date"
                    placeholder="Select Date"
                  />
                ) : (
                  new Date(schedule.date).toLocaleDateString()
                )}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                {schedule.status === "accepted" ? (
                  <span className="italic text-gray-500">Accepted</span>
                ) : (
                  schedule.status
                )}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {schedule.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(schedule.scheduleID, "accepted", schedule.cusID)}
                      className="bg-green-600 text-white font-semibold py-1 px-3 rounded hover:bg-green-700 mr-2"
                      aria-label="Accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(schedule.scheduleID, "rejected", schedule.cusID)}
                      className="bg-red-600 text-white font-semibold py-1 px-3 rounded hover:bg-red-700"
                      aria-label="Reject"
                    >
                      Reject
                    </button>
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
