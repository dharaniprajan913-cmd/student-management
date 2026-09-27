import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const fees = await prisma.fee.findMany();

  return NextResponse.json(fees);
}

export async function POST(request: Request) {
  const body = await request.json();

  const fee = await prisma.fee.create({
    data: {
      studentId: Number(body.studentId),
      amount: Number(body.amount),
      status: body.status,
    },
  });

  return NextResponse.json(fee);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.fee.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Fee deleted",
  });
}