"use client";

import { useEffect, useState } from "react";

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  // Get teachers from database
  const loadTeachers = async () => {
    const response = await fetch("/api/teachers");
    const data = await response.json();
    setTeachers(data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Add teacher to database
  const addTeacher = async () => {
    if (!name || !email || !subject) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
      }),
    });

    setName("");
    setEmail("");
    setSubject("");

    loadTeachers();
  };

  // Delete teacher from database
  const deleteTeacher = async (id: number) => {
    await fetch("/api/teachers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadTeachers();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Teacher Management
        </h1>

        <p className="text-gray-600 mb-8">
          Add and manage teacher information
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Add Teacher
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Teacher Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={addTeacher}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Teacher
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-4">
            Teacher Records
          </h2>

          {teachers.length === 0 ? (
            <p className="text-gray-500">
              No teachers added yet.
            </p>
          ) : (
            <div className="space-y-4">

              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >

                  <div>
                    <h3 className="font-bold text-lg">
                      {teacher.name}
                    </h3>

                    <p>{teacher.email}</p>

                    <p className="text-blue-600">
                      {teacher.subject}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTeacher(teacher.id)}
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