import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";
import { HiDocument, HiTrash, HiX } from 'react-icons/hi';

export function FetchReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null); 

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4000/report/get');

        const reportsWithPDF = response.data.map(report => ({
          ...report,
          reportID: report._id.toString(), 
          pdfUrl: `http://localhost:4000/reports/${report._id}/pdf` 
        }));

        setReports(reportsWithPDF);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (reportID) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await axios.delete(`http://localhost:4000/report/delete/${reportID}`);
        setReports((prevReports) => prevReports.filter(report => report.reportID !== reportID));
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };

  const handleSelectReport = (report) => {
    setSelectedReport(report); 
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <div className="overflow-x-auto w-1/2">
        <h1 className="text-xl font-bold mb-4 text-green-600">Reports</h1>
        <Table>
          <Table.Head>
            <Table.HeadCell>Report ID</Table.HeadCell>
            <Table.HeadCell>Created Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {reports.map((report) => (
              <Table.Row 
                key={report.reportID} 
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" 
                onClick={() => handleSelectReport(report)} 
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <HiDocument className="inline-block mr-2 text-2xl" />
                  {report.reportID}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(report.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete(report.reportID);
                    }} 
                    className="text-red-600 hover:text-red-800"
                  >
                    <HiTrash className="inline-block text-2xl" /> 
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}  
          </Table.Body>
        </Table>
      </div>
      
      <div className="border p-4 mt-4 bg-white rounded-md shadow-md w-1/2 ml-4">
        {selectedReport ? (
          <>
            <h2 className="text-xl font-bold text-green-600 flex justify-between items-center">
              Green Bin Report
              <button 
                onClick={handleCloseReport} 
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close"
              >
                <HiX className="text-2xl" />
              </button>
            </h2>
            <div className="mt-2">
              <p>Most Used Type: </p>
              <p><span className="font-semibold">{selectedReport.mostusedType}</span></p>
            </div>
            <div className="mt-2">
              <p>Most Used Type Weight: </p>
              <p><span className="font-semibold">{selectedReport.mostusedTypeWeight}</span></p>
            </div>
            <div className="mt-2">
              <p>Least Used Type: </p>
              <p><span className="font-semibold">{selectedReport.leastusedType}</span></p>
            </div>
            <div className="mt-2">
              <p>Amount: </p>
              <p><span className="font-semibold">{selectedReport.amount}</span></p>
            </div>
            <div className="mt-2">
              <p>Income: </p>
              <p><span className="font-semibold">{selectedReport.income}</span></p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p>Click on a report in the table to see data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
