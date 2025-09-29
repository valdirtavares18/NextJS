"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles/Page.module.css";

export default function HomePage() {
  const [pacientes, setPacientes] = useState([]);

  const fetchPacientes = async () => {
    try {
      const res = await fetch("/api/pacientes");
      const data = await res.json();
      setPacientes(data);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Pacientes</h1>

      <Link href="/pacientes/novo" className={styles.addButton}>
        + Adicionar Novo Paciente
      </Link>

      <div className={styles.cards}>
        {pacientes.length === 0 ? (
          <p>Nenhum paciente cadastrado.</p>
        ) : (
          pacientes.map((p) => (
            <div key={p.id} className={styles.card}>
              <h3>{p.nome}</h3>
              <p>Nascimento: {p.dataNascimento || "-"}</p>
              <p>Telefone: {p.telefone || "-"}</p>
              <p>Endereço: {p.logradouro ? `${p.logradouro}, ${p.numero || "-"} ${p.complemento || ""}, ${p.bairro || ""}, ${p.cidade || ""} - ${p.estado || ""}` : "-"}</p>
              <div className={styles.actions}>
                <Link href={`/pacientes/${p.id}`} className={styles.detail}>
                  Ver Detalhes
                </Link>
                <Link href={`/pacientes/${p.id}`} className={styles.detail}>
                  Editar
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
