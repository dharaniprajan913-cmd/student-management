"use client";

import { useEffect, useState } from "react";

type Exam = {
  id: number;
  studentId: number;
  subject: string;
  marks: number;
  grade: string;
};

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const loadExams = async () => {
    const response = await fetch("/api/exams");
    const data = await response.json();
    setExams(data);
  };

  useEffect(() => {
    loadExams();
  }, []);

  const calculateGrade = (marks: number) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
  };

  const addExam = async () => {
    if (!studentId || !subject || !marks) {
      alert("Please fill all fields");
      return;
    }

    const markValue = Number(marks);

    await fetch("/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        subject,
        marks: markValue,
        grade: calculateGrade(markValue),
      }),
    });

    setStudentId("");
    setSubject("");
    setMarks("");

    loadExams();
  };

  const deleteExam = async (id: number) => {
    await fetch("/api/exams", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadExams();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Examination Management
        </h1>

        <p className="text-gray-600 mb-8">
          Manage examination marks and grades
        </p>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add Exam Result
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
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={addExam}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Result
          </button>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-4">
            Exam Records
          </h2>

          {exams.length === 0 ? (
            <p className="text-gray-500">
              No exam records yet.
            </p>
          ) : (
            <div className="space-y-4">

              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >

                  <div>
                    <h3 className="font-bold text-lg">
                      Student ID: {exam.studentId}
                    </h3>

                    <p>
                      Subject: {exam.subject}
                    </p>

                    <p>
                      Marks: {exam.marks}
                    </p>

                    <p className="text-blue-600">
                      Grade: {exam.grade}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteExam(exam.id)}
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