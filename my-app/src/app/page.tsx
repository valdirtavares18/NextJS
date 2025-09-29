import prisma from "@/lib/data";
import Link from "next/link";
import styles from "./styles/Page.module.css";

export default async function HomePage() {
  const pacientes = await prisma.paciente.findMany({ orderBy: { nome: "asc" } });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Pacientes</h1>

      <Link href="/pacientes/novo" className={styles.addButton}>
        + Adicionar Novo Paciente
      </Link>

      <div className={styles.cards}>
        {pacientes.map((p) => (
          <div key={p.id} className={styles.card}>
            <h3>{p.nome}</h3>
            <p>Nascimento: {p.dataNascimento || "-"}</p>
            <p>Telefone: {p.telefone || "-"}</p>
            <div className={styles.actions}>
              <Link href={`/pacientes/${p.id}`} className={styles.detail}>
                Ver Detalhes
              </Link>
              <Link href={`/pacientes/${p.id}`} className={styles.detail}>
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        © 2025 - Personaliza Medic
      </footer>
    </div>
  );
}
