import React, { useState } from "react";

const FeeManage = () => {
  const [formData, setFormData] = useState({
    weight: "",
    metric: "kilogram",
    fee: "",
    currency: "",
    date: "", // New field for date
    totalPayment: 0,
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const weightValue = parseFloat(formData.weight) || 0;
    const feeValue = parseFloat(formData.fee) || 0;
    let totalPayment;

    // Calculate total payment based on selected metric
    if (formData.metric === "kilogram") {
      totalPayment = weightValue * feeValue; // Use weight as is for kg
    } else if (formData.metric === "gram") {
      totalPayment = (weightValue / 1000) * feeValue; // Convert grams to kilograms
    }

    if (isEditing !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = { ...formData, totalPayment };
      setSubmittedData(updatedData);
      setIsEditing(null);
      setEditIndex(null);
    } else {
      setSubmittedData([...submittedData, { ...formData, totalPayment }]);
    }

    setFormData({
      weight: "",
      metric: "kilogram", // Reset to default metric
      fee: "",
      currency: "",
      date: "", // Reset date
      totalPayment: 0,
    });
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setIsEditing(index);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-6">
          <h3 className="text-center text-3xl font-extrabold text-gray-900">
            Common run monthly fee
          </h3>
          <div className="flex items-center justify-center px-4 py-2 bg-green-300 text-black rounded-lg">
            Pay By Weight
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter weight"
                />
              </div>

              {/* Metric Dropdown */}
              <div className="flex-1">
                <label
                  htmlFor="metric"
                  className="block text-sm font-medium text-gray-700"
                >
                  Metric
                </label>
                <select
                  name="metric"
                  id="metric"
                  value={formData.metric}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="kilogram">Kilogram</option>
                  <option value="gram">Gram</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="fee"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fee
                </label>
                <input
                  type="text"
                  name="fee"
                  id="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter fee"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  id="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter currency"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                style={{ width: "410px" }}
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-auto mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-100"
              >
                {isEditing !== null ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
        Submitted Details
      </h2>
      <div className="flex-1 flex items-center justify-center bg-white">
        {submittedData.length > 0 ? (
          <div className="w-full p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-center">
              {submittedData.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm m-2 w-1/5"
                >
                  <div className="space-y-1">
                    <p>
                      <strong>Weight:</strong> {data.weight} {data.metric}
                    </p>
                    <p>
                      <strong>Fee:</strong> {data.fee}
                    </p>
                    <p>
                      <strong>Currency:</strong> {data.currency}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(data.date).toLocaleDateString()}{" "}
                      {/* Display date */}
                    </p>
                    <p>
                      <strong>Total Payment:</strong>{" "}
                      {data.totalPayment.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold rounded-md py-2 px-4 transition duration-150 ease-in-out"
                    >
                      Edit Fee
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 font-semibold rounded-md py-2 px-4 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default FeeManage;
