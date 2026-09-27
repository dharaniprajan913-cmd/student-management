import Link from "next/link";

export default function Home() {
  const modules = [
    {
      name: "Students",
      description: "Add and manage student records",
      link: "/students",
      icon: "🎓",
    },
    {
      name: "Teachers",
      description: "Manage teacher information",
      link: "/teachers",
      icon: "👨‍🏫",
    },
    {
      name: "Attendance",
      description: "Track student attendance",
      link: "/attendance",
      icon: "📋",
    },
    {
      name: "Examinations",
      description: "Manage marks and grades",
      link: "/exams",
      icon: "📝",
    },
    {
      name: "Fees",
      description: "Manage student fee payments",
      link: "/fees",
      icon: "💰",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Student Management System
          </h1>

          <p className="mt-3 text-gray-600 text-lg">
            Manage students, teachers, attendance, examinations and fees
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.name}
              href={module.link}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">
                {module.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {module.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {module.description}
              </p>

              <p className="mt-5 font-semibold text-blue-600">
                Open Module →
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-10">
          Student Management Dashboard
        </p>

      </div>
    </main>
  );
}