import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function GET(
  _: Request,
  { params }: { params: { id: string; fileName: string } }
) {
  const pacienteDir = path.join(uploadDir, params.id);
  const filePath = path.join(pacienteDir, params.fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${params.fileName}"`,
    },
  });
}
