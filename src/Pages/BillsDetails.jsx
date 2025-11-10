// BillsDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router';

const BillsDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/specificBill/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="text-center mt-16 text-gray-500 text-lg">Loading...</h2>;
  if (!data) return <h2 className="text-center mt-16 text-red-500 text-lg">Bill not found</h2>;

  const billDate = new Date(data.date);
  const now = new Date();
  const isCurrentMonth =
    billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();

  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md text-gray-800 font-sans">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4">{data.title}</h1>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-48 md:h-56 object-contain rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right: Text */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p><span className="font-semibold">Category:</span> {data.category}</p>
            <p><span className="font-semibold">Location:</span> {data.location}</p>
            <p>
              <span className="font-semibold">Amount:</span>{' '}
              <span className="text-[#00b4d8] font-semibold">{data.amount} BDT</span>
            </p>
            <p><span className="font-semibold">Date:</span> {data.date}</p>
            <p className='text-justify'><span className="font-semibold ">Description:</span> {data.description}</p>
          </div>

          {/* Pay Bill Button */}
          <button
            className={`w-full mt-4 py-2 rounded-md text-white font-semibold text-sm transition-colors duration-300
              ${isCurrentMonth ? 'bg-[#0077b6] hover:bg-[#0076b6c0] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isCurrentMonth}
            onClick={() => alert('Bill Paid Successfully!')}
          >
            {isCurrentMonth
              ? 'Pay Bill'
              : 'Pay Bill (Only current month bills can be paid)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillsDetails;
