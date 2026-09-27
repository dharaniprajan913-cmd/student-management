"use client";

import { useEffect, useState } from "react";

type Fee = {
  id: number;
  studentId: number;
  amount: number;
  status: string;
};

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const loadFees = async () => {
    const response = await fetch("/api/fees");
    const data = await response.json();
    setFees(data);
  };

  useEffect(() => {
    loadFees();
  }, []);

  const addFee = async () => {
    if (!studentId || !amount || !status) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/fees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        amount,
        status,
      }),
    });

    setStudentId("");
    setAmount("");
    setStatus("Pending");

    loadFees();
  };

  const deleteFee = async (id: number) => {
    await fetch("/api/fees", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadFees();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Fee Management
        </h1>

        <p className="text-gray-600 mb-8">
          Manage student fee payments
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add Fee Record
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="number"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

          </div>

          <button
            onClick={addFee}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Fee
          </button>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-4">
            Fee Records
          </h2>

          {fees.length === 0 ? (
            <p className="text-gray-500">
              No fee records yet.
            </p>
          ) : (
            <div className="space-y-4">

              {fees.map((fee) => (
                <div
                  key={fee.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >

                  <div>
                    <h3 className="font-bold text-lg">
                      Student ID: {fee.studentId}
                    </h3>

                    <p>
                      Amount: ₹{fee.amount}
                    </p>

                    <p className="text-blue-600">
                      Status: {fee.status}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteFee(fee.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}