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
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, load]);

  if (loading)
    return (
      <div className="conatiner mx-auto flex justify-center items-center">
        <span className="loading loading-spinner text-info "></span>
      </div>
    );

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
          .then(() => setLoad(!load));
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

    console.log(updatedBill);

    fetch(`https://smart-utility-server.vercel.app/bills/${selectedBill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBill),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Bill updated successfully!");
        setLoad(!load);
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
      <div>
        <title>SmartUtility-MyBill</title>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          My Paid <span className="text-[#023e8a]">Bills</span>
        </h1>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-4 bg-white rounded-lg shadow-lg p-5 min-w-[180px]">
            <FaUser className="text-blue-500 text-4xl sm:text-5xl" />
            <div className="flex flex-col justify-center">
              <p className="text-sm sm:text-base text-gray-500">Bills</p>
              <p className="text-xl sm:text-2xl font-semibold">{totalBills}</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 bg-white rounded-lg shadow-lg p-5 min-w-[180px]">
            <FaMoneyBill className="text-green-700 text-4xl sm:text-5xl" />
            <div className="flex flex-col justify-center">
              <p className="text-sm sm:text-base text-gray-500">Total Paid</p>
              <p className="text-xl sm:text-2xl font-semibold">
                ৳{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0077b6] hover:bg-[#005f8c] transition px-5 py-3 rounded-lg text-white font-medium shadow-lg min-w-[180px]"
          >
            <FaFilePdf size={20} /> Download PDF
          </button>
        </div>

        {/* Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg bg-white">
          {data.length === 0 ? (
            <p className="text-center p-10 text-gray-500 text-sm">
              No payments found.
            </p>
          ) : (
            <table className="w-full min-w-max table-auto text-sm border-collapse">
              <thead className="bg-blue-100 sticky top-0 z-10">
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
                    <th key={header} className="px-4 py-3 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((bill) => (
                  <tr key={bill._id} className="hover:bg-blue-50 transition">
                    <td className="border-t px-4 py-3">{bill.username}</td>
                    <td className="border-t px-4 py-3">{bill.email}</td>
                    <td className="border-t px-4 py-3 text-green-700 font-semibold">
                      ৳{bill.amount}
                    </td>
                    <td className="border-t px-4 py-3">{bill.category}</td>
                    <td className="border-t px-4 py-3">{bill.address}</td>
                    <td className="border-t px-4 py-3">{bill.phone}</td>
                    <td className="border-t px-4 py-3">{bill.date}</td>
                    <td className="border-t px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                      <button
                        onClick={() => handleUpdateClick(bill)}
                        className="flex items-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6] px-3 py-1 rounded"
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => deleteItems(bill._id)}
                        className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile view */}
        <div className="md:hidden flex flex-col gap-4">
          {data.length === 0 ? (
            <p className="text-center p-6 text-gray-500 text-sm">
              No payments found.
            </p>
          ) : (
            data.map((bill) => (
              <div
                key={bill._id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{bill.username}</span>
                  <span className="text-green-700 font-semibold">
                    ৳{bill.amount}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">{bill.email}</div>
                <div className="text-gray-500 text-sm">{bill.address}</div>
                <div className="text-gray-500 text-sm">{bill.phone}</div>
                <div className="text-gray-500 text-sm">{bill.date}</div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdateClick(bill)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6] px-3 py-2 rounded"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => deleteItems(bill._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded"
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
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center text-[#0077b6]">
              Update Bill
            </h3>

            {selectedBill && (
              <form
                onSubmit={handleUpdateSubmit}
                className="flex flex-col gap-3"
              >
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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
                <div className="modal-action flex justify-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      document.getElementById("update_modal").close();
                      setSelectedBill(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-[#0077b6] text-white hover:bg-[#005f8c]"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      </div>
    </Slide>
  );
};

export default MyPayBills;
