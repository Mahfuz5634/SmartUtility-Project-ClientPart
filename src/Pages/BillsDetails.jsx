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

    fetch(`https://smart-utility-server.vercel.app/specificBill/${id}`)
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
      <div className="container mx-auto flex justify-center items-center h-64">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  if (!data)
    return (
      <h2 className="text-center mt-16 text-red-500 text-lg">
        Bill not found
      </h2>
    );

  const billDate = new Date(data.date);
  const now = new Date();
  const isCurrentMonth =
    billDate.getMonth() === now.getMonth() &&
    billDate.getFullYear() === now.getFullYear();

  const handlepaybill = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payData = {
      email: user?.email || "user@example.com",
      billId: data?._id || id,
      amount: data?.amount,
      category: data?.category,
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
      const res = await fetch(
        "https://smart-utility-server.vercel.app/paybill",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payData),
        }
      );

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Payment Successful!");
        form.reset();
        document.getElementById("my_modal_5").close();
      } else {
        toast.error("Failed to process payment. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Server error while saving payment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 py-6 bg-gradient-to-br from-[#eff6ff] via-[#f8fafc] to-[#e3f2fd] rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <title>SmartUtility - BillsDetails</title>

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-[#023e8a] tracking-wide">
        {data.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left: Image */}
        <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md group">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-52 md:h-64 object-contain rounded-xl transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-[#023e8a]">Category:</span>{" "}
            {data.category}
          </p>
          <p>
            <span className="font-semibold text-[#023e8a]">Location:</span>{" "}
            {data.location}
          </p>
          <p>
            <span className="font-semibold text-[#023e8a]">Amount:</span>{" "}
            <span className="text-[#0077b6] font-semibold">
              {data.amount} BDT
            </span>
          </p>
          <p>
            <span className="font-semibold text-[#023e8a]">Date:</span>{" "}
            {data.date}
          </p>
          <p className="text-justify leading-relaxed">
            <span className="font-semibold text-[#023e8a]">Description:</span>{" "}
            {data.description}
          </p>

          {/* Pay Bill Button */}
          <button
            className={`w-full mt-6 py-3 rounded-lg text-white font-semibold text-base transition-all duration-300 shadow-md 
              ${
                isCurrentMonth
                  ? "bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!isCurrentMonth}
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            {isCurrentMonth
              ? "💳 Pay Bill"
              : "⚠️ Only current month bills can be paid"}
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle transition-all duration-300"
      >
        <div className="modal-box bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-5 text-center text-[#0077b6]">
            💰 Pay Bill Form
          </h3>

          <form onSubmit={handlepaybill} className="space-y-3">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user?.email || "user@example.com"}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            {/* Bill ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Bill ID
              </label>
              <input
                type="text"
                value={data?._id || id}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Amount (BDT)
              </label>
              <input
                type="text"
                value={data?.amount || ""}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={data?.category || ""}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
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
              <label className="block text-sm font-semibold text-gray-700">
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
              <label className="block text-sm font-semibold text-gray-700">
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
              <label className="block text-sm font-semibold text-gray-700">
                Date
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            {/* Actions */}
            <div className="modal-action flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline btn-sm md:btn-md"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm md:btn-md bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white border-none hover:opacity-90"
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
