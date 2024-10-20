import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = data => {
        if (data) {
            setScanResult(data);
            console.log('Scanned data:', data);
        }
    };

    const handleError = err => {
        console.error(err);
    };

    const toggleScanner = () => {
        setIsScanning(!isScanning);
    };

    return (
        <div>
            <button onClick={toggleScanner} className='bg-green-600 hover:bg-green-700 text-white p-2 px-4 rounded-full'>
                {isScanning ? 'Stop Scanning' : 'Scan QR'}
            </button>
            {isScanning && (
                <QrScanner
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            )}
            {scanResult && (
                <div>
                    <h2>Scanned Result:</h2>
                    <p>{scanResult.text || 'No text found'}</p>
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;