import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const AdminDashboardReportGeneration = () => {
  const reportRef = useRef();
  const [reportData, setReportData] = useState(null);

  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:4000/report/generate');
      const report = response.data.report;
      setReportData(report);

      // Wait for the state to be set before creating the PDF
      setTimeout(() => {
        createPDF(report);
      }, 0);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const createPDF = async (report) => {
    const element = reportRef.current;

    if (!element) {
      console.error("The report element is not available.");
      return;
    }

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      const imgWidth = 190; 
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('report.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Report Generation</h1>
      <button 
        onClick={generateReport} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Generate Report
      </button>

      {reportData && (
        <div ref={reportRef} className="mt-4 p-4 border rounded bg-white shadow-md">
          <h2 className="text-lg font-bold">Report Title</h2>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <h3 className="font-semibold">Most Used Type: </h3>
          <p>{reportData.mostusedType}</p>
          <h3 className="font-semibold">Most Used Type Weight: </h3>
          <p>{reportData.mostusedTypeWeight} kg</p>
          <h3 className="font-semibold">Least Used Type: </h3>
          <p>{reportData.leastusedType}</p>
          <h3 className="font-semibold">Least Used Type Weight: </h3>
          <p>{reportData.leastusedTypeWeight} kg</p>
          <h3 className="font-semibold">Total Amount: </h3>
          <p>{reportData.amount} kg</p>
          <h3 className="font-semibold">Total Income: </h3>
          <p>${reportData.income}</p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardReportGeneration;
