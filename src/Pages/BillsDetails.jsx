import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context Api/AuthContext";

const BillsDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/specificBill/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <h2 className="text-center mt-16 text-gray-500 text-lg">Loading...</h2>
    );
  if (!data)
    return (
      <h2 className="text-center mt-16 text-red-500 text-lg">Bill not found</h2>
    );

  const billDate = new Date(data.date);
  const now = new Date();
  const isCurrentMonth =
    billDate.getMonth() === now.getMonth() &&
    billDate.getFullYear() === now.getFullYear();

    const handlepaybill=async (e)=>{
      e.preventDefault();
      const form=e.target;

      const payData = {
      email: user?.email || "user@example.com",
      billId: data?._id || id,
      amount: data?.amount,
      category:data?.category,
      username: form.username.value.trim(),
      address: form.address.value.trim(),
      phone: form.phone.value.trim(),
      date: new Date().toLocaleDateString(),
    };

     if (!payData.username || !payData.address || !payData.phone) {
      toast.warning("⚠️ Please fill in all required fields!");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/paybill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payData),
      });

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Payment SuccessFull!");
        form.reset();
        document.getElementById("my_modal_5").close();
      } else {
        toast.error("Failed to payment. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while saving payment.");
    }
  };
    


  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md text-gray-800 font-sans">
      <title>SmartUtility - BillsDetails</title>
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4">
        {data.title}
      </h1>

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
            <p>
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {data.location}
            </p>
            <p>
              <span className="font-semibold">Amount:</span>{" "}
              <span className="text-[#00b4d8] font-semibold">
                {data.amount} BDT
              </span>
            </p>
            <p>
              <span className="font-semibold">Date:</span> {data.date}
            </p>
            <p className="text-justify">
              <span className="font-semibold">Description:</span>{" "}
              {data.description}
            </p>
          </div>

          {/* Pay Bill Button */}
          <button
            className={`w-full mt-4 py-2 rounded-md text-white font-semibold text-sm transition-colors duration-300
              ${
                isCurrentMonth
                  ? "bg-[#0077b6] hover:bg-[#0076b6c0] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!isCurrentMonth}
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            {isCurrentMonth
              ? "Pay Bill"
              : "Pay Bill (Only current month bills can be paid)"}
          </button>
        </div>
      </div>

      {/* ✅ Modal added here */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-center text-[#0077b6]">
            Pay Bill Form
          </h3>

          <form
           onSubmit={handlepaybill}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user?.email || "user@example.com"}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Bill ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill ID
              </label>
              <input
                type="text"
                value={data?._id || id}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (BDT)
              </label>
              <input
                type="text"
                value={data?.amount || ""}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={data?.category || ""}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Actions */}
            <div className="modal-action flex justify-end">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-[#0077b6] text-white hover:bg-[#0076b6c0]"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BillsDetails;
