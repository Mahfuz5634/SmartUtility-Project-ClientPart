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
      .then((bill) => {
        setData(bill);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-64">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-16 px-6 py-8 rounded-2xl bg-red-50 border border-red-200 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-red-600">Bill not found</h2>
        <p className="mt-2 text-sm text-red-500">
          The bill you are trying to view does not exist or may have been
          removed.
        </p>
      </div>
    );
  }

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
    <div className="max-w-5xl mx-auto my-10 px-4">
      <title>SmartUtility - Bill Details</title>

      <section className="relative bg-gradient-to-br from-[#eff6ff] via-[#f8fafc] to-[#e3f2fd] rounded-3xl shadow-xl border border-gray-100 px-5 sm:px-8 py-8 transition-all duration-300 hover:shadow-2xl overflow-hidden">
        {/* soft background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-52 h-52 rounded-full bg-cyan-400/25 blur-3xl" />
        </div>

        {/* top badge & title */}
        <div className="flex flex-col items-center text-center mb-6">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-sky-100 text-xs sm:text-sm text-sky-700 shadow-sm">
            📄 Bill details · {data.category}
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#023e8a] tracking-tight">
            {data.title}
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-xl">
            Review the full information for this bill and complete a secure
            payment if it is part of the current billing cycle.
          </p>
        </div>

        {/* main layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Left: image + meta blocks */}
          <div className="md:w-1/2 w-full space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-md bg-white/80">
              <div className="relative group">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-56 md:h-64 object-contain bg-white rounded-2xl transform transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 shadow-sm">
                  {data.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white/80 rounded-xl border border-slate-100 px-3 py-2 shadow-sm">
                <p className="text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{data.location}</p>
              </div>
              <div className="bg-white/80 rounded-xl border border-slate-100 px-3 py-2 shadow-sm">
                <p className="text-gray-500">Bill Date</p>
                <p className="font-semibold text-gray-800">{data.date}</p>
              </div>
              <div className="bg-white/80 rounded-xl border border-slate-100 px-3 py-2 shadow-sm">
                <p className="text-gray-500">Amount</p>
                <p className="font-semibold text-[#0077b6]">
                  {data.amount} BDT
                </p>
              </div>
              <div className="bg-white/80 rounded-xl border border-slate-100 px-3 py-2 shadow-sm">
                <p className="text-gray-500">Status</p>
                <p
                  className={`font-semibold ${
                    isCurrentMonth ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isCurrentMonth
                    ? "Payable this month"
                    : "Past month · View only"}
                </p>
              </div>
            </div>
          </div>

          {/* Right: description + details + CTA */}
          <div className="md:w-1/2 w-full space-y-4 text-gray-700">
            <div className="bg-white/85 rounded-2xl border border-slate-100 px-4 py-4 shadow-sm">
              <h2 className="text-lg font-semibold text-[#023e8a] mb-2">
                Bill information
              </h2>
              <p className="text-sm leading-relaxed text-justify">
                <span className="font-semibold text-[#023e8a]">
                  Description:
                </span>{" "}
                {data.description}
              </p>
            </div>

            <div className="bg-white/85 rounded-2xl border border-slate-100 px-4 py-4 shadow-sm space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Category:</span>
                <span>{data.category}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Location:</span>
                <span>{data.location}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Amount:</span>
                <span className="text-[#0077b6] font-semibold">
                  {data.amount} BDT
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-gray-600">Bill Date:</span>
                <span>{data.date}</span>
              </p>
            </div>

            <button
              className={`w-full mt-2 py-3 rounded-lg text-white font-semibold text-base transition-all duration-300 shadow-md ${
                isCurrentMonth
                  ? "bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90 hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isCurrentMonth}
              onClick={() =>
                isCurrentMonth &&
                document.getElementById("my_modal_5").showModal()
              }
            >
              {isCurrentMonth
                ? "💳 Pay this bill securely"
                : "⚠️ Only current month bills can be paid"}
            </button>
            {!isCurrentMonth && (
              <p className="mt-1 text-xs text-gray-500">
                This bill belongs to a previous billing cycle and is shown for
                record-keeping only.
              </p>
            )}
          </div>
        </div>

        {/* Modal */}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle transition-all duration-300"
        >
          <div className="modal-box bg-white rounded-2xl shadow-2xl p-6 relative">
            <h3 className="font-bold text-xl mb-2 text-center text-[#0077b6]">
              💰 Pay Bill
            </h3>
            <p className="text-xs text-center text-gray-500 mb-4">
              Confirm your details below and proceed to complete the payment.
            </p>

            <form onSubmit={handlepaybill} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || "user@example.com"}
                    readOnly
                    className="input input-bordered w-full mt-1 bg-gray-100 text-sm"
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
                    className="input input-bordered w-full mt-1 bg-gray-100 text-sm"
                  />
                </div>
              </div>

              {/* Amount & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Amount (BDT)
                  </label>
                  <input
                    type="text"
                    value={data?.amount || ""}
                    readOnly
                    className="input input-bordered w-full mt-1 bg-gray-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={data?.category || ""}
                    readOnly
                    className="input input-bordered w-full mt-1 bg-gray-100 text-sm"
                  />
                </div>
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
                  className="input input-bordered w-full mt-1 text-sm"
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
                  className="input input-bordered w-full mt-1 text-sm"
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
                  className="input input-bordered w-full mt-1 text-sm"
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
                  className="input input-bordered w-full mt-1 bg-gray-100 text-sm"
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
      </section>
    </div>
  );
};

export default BillsDetails;
