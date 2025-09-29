import { NextResponse } from "next/server";
import prisma from "@/lib/data";

// Listar todos os pacientes
export async function GET() {
  try {
    const pacientes = await prisma.paciente.findMany({ orderBy: { nome: "asc" } });
    return NextResponse.json(pacientes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao listar pacientes" }, { status: 500 });
  }
}

// Criar novo paciente
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const paciente = await prisma.paciente.create({ data });
    return NextResponse.json(paciente, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar paciente" }, { status: 500 });
  }
}
