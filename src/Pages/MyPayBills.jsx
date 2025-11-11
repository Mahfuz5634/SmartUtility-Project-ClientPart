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

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`http://localhost:3000/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  
  if (loading)
    return (
      <><div className="conatiner mx-auto flex justify-center items-center">
        <span className="loading loading-spinner text-info "></span>
        </div></>
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

    doc.setFontSize(14);
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.text(`Total Bills Paid: ${totalBills}`, 40, finalY);
    doc.text(`Total Amount: ${totalAmount.toLocaleString()}`, 40, finalY + 20);

    doc.save("my_payments_report.pdf");
  };

  return (
    <Slide direction="up" duration={800} triggerOnce className="max-w-6xl mx-auto mt-8 px-4">
      <div>
        <title>SmartUtility-MyBill</title>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#0077b6]">
          My Paid Bills
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

        {/* Table for tablet+ */}
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
                    <td className="border-t px-4 py-3">{bill.address}</td>
                    <td className="border-t px-4 py-3">{bill.phone}</td>
                    <td className="border-t px-4 py-3">{bill.date}</td>
                    <td className="border-t px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                      <button
                        onClick={() => toast.info("Update coming soon")}
                        className="flex items-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6] px-3 py-1 rounded"
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => toast.info("Delete feature coming soon")}
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

        {/* Card view for mobile */}
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
                    onClick={() => toast.info("Update coming soon")}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#0096d6] text-white hover:bg-[#0077b6 px-3  py-2 rounded"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => toast.info("Delete feature coming soon")}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white hover:bg-red-600 px-3  py-2 rounded"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Slide>
  );
};

export default MyPayBills;
