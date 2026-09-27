import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const attendance = await prisma.attendance.findMany();

  return NextResponse.json(attendance);
}

export async function POST(request: Request) {
  const body = await request.json();

  const attendance = await prisma.attendance.create({
    data: {
      studentId: Number(body.studentId),
      date: new Date(body.date),
      status: body.status,
    },
  });

  return NextResponse.json(attendance);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.attendance.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Attendance deleted",
  });
}