import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

// Garantir que a pasta exista
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });

  const pacienteId = params.id;
  const pacienteDir = path.join(uploadDir, pacienteId);
  if (!fs.existsSync(pacienteDir)) fs.mkdirSync(pacienteDir);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(pacienteDir, file.name);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ message: "Arquivo enviado com sucesso", nome: file.name });
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const pacienteId = params.id;
  const pacienteDir = path.join(uploadDir, pacienteId);

  if (!fs.existsSync(pacienteDir)) return NextResponse.json([]);

  const files = fs.readdirSync(pacienteDir);
  return NextResponse.json(files);
}
