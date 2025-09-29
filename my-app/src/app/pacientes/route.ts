import { NextResponse } from "next/server";
import prisma from "@/lib/data";

export async function GET() {
  try {
    const pacientes = await prisma.paciente.findMany({ orderBy: { nome: "asc" } });
    return NextResponse.json(pacientes);
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
    return NextResponse.json({ error: "Erro ao listar pacientes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const paciente = await prisma.paciente.create({
      data: {
        nome: data.nome,
        dataNascimento: data.dataNascimento,
        telefone: data.telefone,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
      },
    });

    return NextResponse.json(paciente, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar paciente:", err);
    return NextResponse.json({ error: "Erro ao criar paciente" }, { status: 500 });
  }
}
