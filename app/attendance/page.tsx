"use client";

import { useState } from "react";

type Attendance = {
  id: number;
  student: string;
  date: string;
  status: string;
};

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const addAttendance = () => {
    if (!student || !date) {
      alert("Please fill all fields");
      return;
    }

    const newRecord = {
      id: Date.now(),
      student,
      date,
      status,
    };

    setRecords([...records, newRecord]);

    setStudent("");
    setDate("");
    setStatus("Present");
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Attendance Management
        </h1>

        <p className="text-gray-600 mb-8">
          Track student attendance
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Mark Attendance
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Student Name"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <button
            onClick={addAttendance}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Mark Attendance
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Attendance Records
          </h2>

          {records.length === 0 ? (
            <p className="text-gray-500">
              No attendance records yet.
            </p>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {record.student}
                    </h3>

                    <p>{record.date}</p>

                    <p className="text-blue-600">
                      {record.status}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteRecord(record.id)}
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