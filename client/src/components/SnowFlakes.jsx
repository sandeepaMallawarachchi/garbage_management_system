import React, { useEffect, useState } from 'react';
import '../CSS/SnowFlakes.css';

const SnowFlakes = () => {
  const [isDecember, setIsDecember] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setIsDecember(currentMonth === 11);
  }, []);

  if (!isDecember) return null;

  return (
    <div className="snowflakes" aria-hidden="true">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="snowflake">
          ❅
        </div>
      ))}
    </div>
  );
};

export default SnowFlakes;