import prisma from "@/lib/data";
import { NextResponse } from "next/server";

// GET /api/pacientes/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const paciente = await prisma.paciente.findUnique({
    where: { id: Number(params.id) },
  });
  if (!paciente) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(paciente);
}

// PUT /api/pacientes/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const paciente = await prisma.paciente.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(paciente);
}

// DELETE /api/pacientes/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.paciente.delete({
    where: { id: Number(params.id) },
  });
  return new NextResponse(null, { status: 204 });
}
