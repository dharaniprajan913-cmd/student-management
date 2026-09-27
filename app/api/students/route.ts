import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const body = await request.json();

  const student = await prisma.student.create({
    data: {
      name: body.name,
      email: body.email,
      course: body.course,
    },
  });

  return NextResponse.json(student);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.student.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({ message: "Student deleted" });
}