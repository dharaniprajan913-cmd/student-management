import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const exams = await prisma.exam.findMany();

  return NextResponse.json(exams);
}

export async function POST(request: Request) {
  const body = await request.json();

  const exam = await prisma.exam.create({
    data: {
      studentId: Number(body.studentId),
      subject: body.subject,
      marks: Number(body.marks),
      grade: body.grade,
    },
  });

  return NextResponse.json(exam);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.exam.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Exam deleted",
  });
}