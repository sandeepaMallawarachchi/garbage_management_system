import React, { useEffect, useState } from 'react';
import bin1 from '../images/bin1.png';
import bin2 from '../images/bin2.png';
import bin3 from '../images/bin3.png';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import WasteReportPDF from '../components/WasteReportPDF';

const WasteLevels = () => {
    const [wasteLevels, setWasteLevels] = useState({
        organic: 0,
        recyclable: 0,
        eWaste: 0,
    });
    const cusID = localStorage.getItem('cusID');

    useEffect(() => {
        const fetchWasteLevels = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/customer/getWasteLevels/${cusID}`);
                setWasteLevels(response.data);
            } catch (error) {
                console.error('Error fetching waste levels:', error);
            }
        };

        fetchWasteLevels();
    }, [cusID]);

    return (
        <div>
            <h1 className="text-green-600 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6 sm:my-8 md:my-10">
                My Waste Levels
            </h1>
            <div className="waste-levels-container p-4 sm:p-6 md:p-8 flex flex-wrap justify-center gap-6 md:gap-10">
                <div className="waste-bin text-center">
                    <img
                        src={bin3}
                        alt="Organic Waste Bin"
                        className="w-24 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 mb-2 sm:mb-3 md:mb-4 mx-auto"
                    />
                    <h3 className="text-md sm:text-lg font-bold">Organic Waste</h3>
                    <p className="text-green-500 text-lg sm:text-xl md:text-2xl">{wasteLevels.organic} kg</p>
                </div>
                <div className="waste-bin text-center">
                    <img
                        src={bin2}
                        alt="Recyclable Waste Bin"
                        className="w-24 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 mb-2 sm:mb-3 md:mb-4 mx-auto"
                    />
                    <h3 className="text-md sm:text-lg font-bold">Recyclable Waste</h3>
                    <p className="text-green-500 text-lg sm:text-xl md:text-2xl">{wasteLevels.recyclable} kg</p>
                </div>
                <div className="waste-bin text-center">
                    <img
                        src={bin1}
                        alt="E-Waste Bin"
                        className="w-24 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 mb-2 sm:mb-3 md:mb-4 mx-auto"
                    />
                    <h3 className="text-md sm:text-lg font-bold">E-Waste</h3>
                    <p className="text-green-500 text-lg sm:text-xl md:text-2xl">{wasteLevels.eWaste} kg</p>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <PDFDownloadLink
                    document={<WasteReportPDF wasteLevels={wasteLevels} />}
                    fileName="WasteReport.pdf"
                    style={{
                        textDecoration: 'none',
                        color: '#fff',
                        backgroundColor: '#057a55',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        display: 'inline-block',
                    }}
                >
                    Download Waste Report
                </PDFDownloadLink>
            </div>
        </div>

    );
};

export default WasteLevels;