"use client";

import { useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const addStudent = () => {
    if (!name || !email || !course) {
      alert("Please fill all fields");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      email,
      course,
    };

    setStudents([...students, newStudent]);

    setName("");
    setEmail("");
    setCourse("");
  };

  const deleteStudent = (id: number) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Student Management
        </h1>

        <p className="text-gray-600 mb-8">
          Add and manage student records
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add Student
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Student Name"
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
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={addStudent}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Student
          </button>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-4">
            Student Records
          </h2>

          {students.length === 0 ? (
            <p className="text-gray-500">
              No students added yet.
            </p>
          ) : (
            <div className="space-y-4">

              {students.map((student) => (
                <div
                  key={student.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >

                  <div>
                    <h3 className="font-bold text-lg">
                      {student.name}
                    </h3>

                    <p>{student.email}</p>

                    <p className="text-blue-600">
                      {student.course}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteStudent(student.id)}
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