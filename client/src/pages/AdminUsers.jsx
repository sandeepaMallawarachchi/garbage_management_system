import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { HiTrash } from 'react-icons/hi';
import axios from 'axios';

const AdminUsers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://garbage-management-system-server.vercel.app/customer/getAllCustomers');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customers');
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (cusID) => {
    try {
      if (window.confirm('Are you sure you want to delete user?')) {
        await axios.delete(`https://garbage-management-system-server.vercel.app/customer/deleteCustomer/${cusID}`);
        setCustomers(customers.filter(customer => customer.cusID !== cusID));
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4 text-green-600">Users Database</h1>
      {error && <p>{error}</p>}
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {customers.map(customer => (
            <Table.Row key={customer.cusID} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {customer.name}
              </Table.Cell>
              <Table.Cell>{customer.email}</Table.Cell>
              <Table.Cell>{customer.address}</Table.Cell>
              <Table.Cell>{customer.phone}</Table.Cell>
              <Table.Cell>
                <button onClick={() => handleDelete(customer.cusID)} className="text-red-600 hover:underline text-center">
                  <HiTrash size={24} />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdminUsers;