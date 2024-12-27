import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { HiX } from "react-icons/hi";
import CryptoJS from 'crypto-js';

const QRModal = ({ onClose }) => {
    const cusID = localStorage.getItem('cusID');

    const encryptedCusID = CryptoJS.AES.encrypt(cusID, 'your-secret-key').toString();
    const encodedCusID = encodeURIComponent(encryptedCusID);
    
    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-code');
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qr-code.png';
        link.click();
    };

    const qrLink = `http://localhost:3000/qrDetails/${encodedCusID}`;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Customer QR Code</h2>
                    <HiX onClick={onClose} size={24} className='text-green-600 cursor-pointer' />
                </div>

                <div className="mb-4 flex justify-center">
                    <QRCodeCanvas id="qr-code" value={qrLink} size={256} />
                </div>
                <div className="flex justify-center">
                    <button onClick={downloadQRCode} className="mt-5 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                        Download QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRModal;