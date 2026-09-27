import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const teachers = await prisma.teacher.findMany();

  return NextResponse.json(teachers);
}

export async function POST(request: Request) {
  const body = await request.json();

  const teacher = await prisma.teacher.create({
    data: {
      name: body.name,
      email: body.email,
      subject: body.subject,
    },
  });

  return NextResponse.json(teacher);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.teacher.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Teacher deleted",
  });
}