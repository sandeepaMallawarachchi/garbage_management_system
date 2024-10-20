import React, { useState } from 'react';
import bin1 from '../images/bin1.png';
import bin2 from '../images/bin2.png';
import bin3 from '../images/bin3.png';

const WasteLevels = () => {
    const [wasteLevels, setWasteLevels] = useState({
        organic: 15,
        recyclable: 22,
        eWaste: 8,
    });

    return (
        <div>
            <h1 className='text-green-600 text-4xl text-center font-semibold my-10'>My Waste Levels</h1>
            <div className="waste-levels-container p-8 flex justify-center gap-10">
                <div className="waste-bin text-center">
                    <img src={bin3} alt="Organic Waste Bin" className="w-48 h-48 mb-4" />
                    <h3 className="text-lg font-bold">Organic Waste</h3>
                    <p className='text-green-500 text-2xl'>{wasteLevels.organic} kg</p>
                </div>
                <div className="waste-bin text-center">
                    <img src={bin2} alt="Recyclable Waste Bin" className="w-48 h-48 mb-4" />
                    <h3 className="text-lg font-bold">Recyclable Waste</h3>
                    <p className='text-green-500 text-2xl'>{wasteLevels.recyclable} kg</p>
                </div>
                <div className="waste-bin text-center">
                    <img src={bin1} alt="E-Waste Bin" className="w-48 h-48 mb-4" />
                    <h3 className="text-lg font-bold">E-Waste</h3>
                    <p className='text-green-500 text-2xl'>{wasteLevels.eWaste} kg</p>
                </div>
            </div>
        </div>
    );
};

export default WasteLevels;
