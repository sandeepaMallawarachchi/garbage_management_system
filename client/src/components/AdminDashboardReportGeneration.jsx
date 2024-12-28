import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import logo from "../images/logo.png"; 

const AdminDashboardReportGeneration = () => {
  const reportRef = useRef();
  const [reportData, setReportData] = useState(null);

  const generateReport = async () => {
    try {
      const response = await axios.get('https://garbage-management-system-server.vercel.app/report/generate');
      const report = response.data.report;
      setReportData(report);

      setTimeout(() => {
        createPDF(report);
      }, 0);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const createPDF = async (report) => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const marginLeft = 15;
      const marginRight = 15;

      pdf.addImage(logo, 'PNG', marginLeft, 10, 30, 30);
      pdf.setFontSize(14);
      pdf.text("Green Bin", 105, 20, { align: "center" });
      pdf.setFontSize(10);
      pdf.text("No.123, Bauddhaloka Mavatha,", 105, 26, { align: "center" });
      pdf.text("Colombo", 105, 30, { align: "center" });
      pdf.text("Email: greenbin@support.com | Tel: 123-456-7890", 105, 34, { align: "center" });
  
      pdf.setFontSize(16);
      pdf.text("Waste Management Official Report", 105, 50, { align: "center" });
  
      pdf.line(marginLeft, 55, 210 - marginRight, 55);
  
      pdf.setFontSize(12);
      pdf.text("Report generated on: " + new Date().toLocaleDateString(), marginLeft, 65);
  
      pdf.setFontSize(12);
      pdf.text("Most Used Type:", marginLeft, 75);
      pdf.text(`${report.mostusedType}`, marginLeft + 50, 75);
      pdf.text("Most Used Type Weight:", marginLeft, 85);
      pdf.text(`${report.mostusedTypeWeight} kg`, marginLeft + 50, 85);
      
      pdf.text("Least Used Type:", marginLeft, 95);
      pdf.text(`${report.leastusedType}`, marginLeft + 50, 95);
      pdf.text("Least Used Type Weight:", marginLeft, 105);
      pdf.text(`${report.leastusedTypeWeight} kg`, marginLeft + 50, 105);
      
      pdf.text("Total Amount of Waste:", marginLeft, 115);
      pdf.text(`${report.amount} kg`, marginLeft + 50, 115);
      pdf.text("Total Income:", marginLeft, 125);
      pdf.text(`$${report.income}`, marginLeft + 50, 125);
  
      pdf.line(marginLeft, 135, 210 - marginRight, 135);

      pdf.setFontSize(10);
      pdf.text("Page 1 of 1", 105, 285, { align: "center" });
      pdf.text("Green Bin - Waste Management Report", 105, 290, { align: "center" });
  
      pdf.save('official_report.pdf');
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
          <h2 className="text-lg font-bold">Green Bin - Waste Management Report</h2>
          <p className='mb-5'>Date: {new Date().toLocaleDateString()}</p>
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
};

export default AdminDashboardReportGeneration;
