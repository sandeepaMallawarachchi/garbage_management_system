import React from 'react';

const PaymentComponent = ({ schedule, handlePay }) => {
  return (
    schedule.paymentMethod === 'card' &&
    (schedule.status === 'accepted' || schedule.status === 'pending') && (
      <a
        onClick={() => handlePay(schedule.scheduleID)}
        className="font-medium bg-green-600 text-white p-2 px-3 rounded-2xl hover:bg-green-700 ml-4 cursor-pointer"
      >
        Pay
      </a>
    )
  );
};

export default PaymentComponent;