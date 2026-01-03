import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context Api/AuthContext";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaFilePdf,
  FaUser,
  FaMoneyBill,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(
      `https://smart-utility-server.vercel.app/payments?email=${user.email}`
    )
      .then((res) => res.json())
      .then((bills) => {
        setData(bills);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, load]);

  if (loading) {
    return (
      <div className="conatiner mx-auto flex justify-center items-center h-64">
        <span className="loading loading-spinner text-info "></span>
      </div>
    );
  }

  const totalBills = data.length;
  const totalAmount = data.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(18);
    doc.text("My Payments Report", 300, 40, { align: "center" });

    autoTable(doc, {
      head: [["Username", "Email", "Amount", "Address", "Phone", "Date"]],
      body: data.map((bill) => [
        bill.username,
        bill.email,
        `${bill.amount} BDT`,
        bill.address,
        bill.phone,
        bill.date,
      ]),
      startY: 70,
      styles: { fontSize: 11, cellPadding: 6 },
      headStyles: { fillColor: [0, 119, 182], textColor: 255 },
    });

    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text(`Total Bills Paid: ${totalBills}`, 40, finalY);
    doc.text(`Total Amount: ${totalAmount.toLocaleString()}`, 40, finalY + 20);

    doc.save("my_payments_report.pdf");
  };

  const deleteItems = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-utility-server.vercel.app/bills/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => setLoad((prev) => !prev));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleUpdateClick = (bill) => {
    setSelectedBill(bill);
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBill = {
      ...selectedBill,
      username: form.username.value,
      address: form.address.value,
      phone: form.phone.value,
      amount: Number(form.amount.value),
      date: form.date.value,
    };

    fetch(`https://smart-utility-server.vercel.app/bills/${selectedBill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBill),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Bill updated successfully!");
        setLoad((prev) => !prev);
        setSelectedBill(null);
        document.getElementById("update_modal").close();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Slide
      direction="up"
      duration={800}
      triggerOnce
      className="max-w-6xl mx-auto mt-8 px-4"
    >
      <section className="relative rounded-3xl bg-gradient-to-br from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 sm:px-6 py-8 shadow-xl border border-slate-100/80 dark:border-slate-800/80">
        {/* soft decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-sky-300/25 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-52 h-52 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <title>SmartUtility-MyBill</title>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 shadow-sm">
            📊 Your payment history
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            My Paid <span className="text-[#023e8a]">Bills</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            View a summary of your paid bills, download reports, and update or
            delete entries when necessary.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-7">
          <div className="flex-1 flex items-center gap-4 bg-white/85 dark:bg-slate-900/85 rounded-2xl shadow-md border border-slate-100/80 dark:border-slate-700/80 p-5 min-w-[180px]">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-900/40">
              <FaUser className="text-blue-500 text-2xl" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Bills
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                {totalBills}
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-4 bg-white/85 dark:bg-slate-900/85 rounded-2xl shadow-md border border-slate-100/80 dark:border-slate-700/80 p-5 min-w-[180px]">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40">
              <FaMoneyBill className="text-green-700 text-2xl" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total Paid
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                ৳{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:brightness-110 transition px-5 py-3 rounded-2xl text-white font-medium shadow-md min-w-[180px] text-sm sm:text-base"
          >
            <FaFilePdf size={18} /> Download PDF
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white/90 dark:bg-slate-900/90 border border-slate-100/80 dark:border-slate-800/80">
          {data.length === 0 ? (
            <p className="text-center p-10 text-gray-500 text-sm dark:text-gray-300">
              No payments found.
            </p>
          ) : (
            <table className="w-full min-w-max table-auto text-sm border-collapse">
              <thead className="bg-sky-50 dark:bg-slate-800">
                <tr>
                  {[
                    "Username",
                    "Email",
                    "Amount",
                    "Category",
                    "Address",
                    "Phone",
                    "Date",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((bill, idx) => (
                  <tr
                    key={bill._id}
                    className={`${
                      idx % 2 === 0
                        ? "bg-white/80 dark:bg-slate-900/80"
                        : "bg-slate-50/80 dark:bg-slate-900/60"
                    } hover:bg-sky-50/80 dark:hover:bg-slate-800/80 transition`}
                  >
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.username}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.email}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3 text-emerald-700 dark:text-emerald-400 font-semibold">
                      ৳{bill.amount}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.category}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.address}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.phone}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      {bill.date}
                    </td>
                    <td className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <button
                          onClick={() => handleUpdateClick(bill)}
                          className="flex items-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6] px-3 py-1 rounded-md text-xs font-medium"
                        >
                          <FaEdit /> Update
                        </button>
                        <button
                          onClick={() => deleteItems(bill._id)}
                          className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md text-xs font-medium"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {data.length === 0 ? (
            <p className="text-center p-6 text-gray-500 text-sm dark:text-gray-300">
              No payments found.
            </p>
          ) : (
            data.map((bill) => (
              <div
                key={bill._id}
                className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-md border border-slate-100/80 dark:border-slate-800/80 p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {bill.username}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    ৳{bill.amount}
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                  {bill.email}
                </div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                  {bill.category}
                </div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                  {bill.address}
                </div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                  {bill.phone}
                </div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                  {bill.date}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdateClick(bill)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6] px-3 py-2 rounded-md text-xs font-medium"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => deleteItems(bill._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-xs font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Update Modal */}
        <dialog
          id="update_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
            <h3 className="font-bold text-xl mb-4 text-center text-[#0077b6]">
              Update Bill
            </h3>

            {selectedBill && (
              <form
                onSubmit={handleUpdateSubmit}
                className="flex flex-col gap-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={selectedBill.username}
                      required
                      className="input input-bordered w-full mt-1"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Amount (BDT)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={selectedBill.amount}
                      required
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={selectedBill.address}
                    required
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedBill.phone}
                    required
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Date
                  </label>
                  <input
                    name="date"
                    defaultValue={selectedBill.date}
                    required
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Actions */}
                <div className="modal-action flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm md:btn-md"
                    onClick={() => {
                      document.getElementById("update_modal").close();
                      setSelectedBill(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm md:btn-md bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white border-none hover:opacity-90"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      </section>
    </Slide>
  );
};

export default MyPayBills;
