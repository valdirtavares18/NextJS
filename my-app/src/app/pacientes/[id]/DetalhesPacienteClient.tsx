"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/Detalhes.module.css";

type Paciente = {
  id: number;
  nome: string;
  dataNascimento?: string;
  telefone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
};

type Props = {
  pacienteId: string;
};

export default function DetalhesPacienteClient({ pacienteId }: Props) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  const fetchPaciente = async () => {
    try {
      const res = await fetch(`/api/pacientes`);
      const data: Paciente[] = await res.json();
      const found = data.find((p) => p.id === Number(pacienteId));
      setPaciente(found || null);
    } catch (err) {
      console.error("Erro ao buscar paciente:", err);
    }
  };

  useEffect(() => {
    fetchPaciente();
  }, [pacienteId]);

  if (!paciente) return <p>Carregando paciente...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{paciente.nome}</h2>
      <p>Data de Nascimento: {paciente.dataNascimento || "-"}</p>
      <p>Telefone: {paciente.telefone || "-"}</p>
      <p>
        Endereço:{" "}
        {paciente.logradouro
          ? `${paciente.logradouro}, ${paciente.numero || "-"} ${paciente.complemento || ""}, ${paciente.bairro || ""}, ${paciente.cidade || ""} - ${paciente.estado || ""}`
          : "-"}
      </p>

      <div className={styles.actions}>
        <button className={styles.edit}>Editar</button>
        <button className={styles.delete}>Excluir</button>
        <button className={styles.save}>Salvar</button>
        <button className={styles.cancel}>Cancelar</button>
      </div>

      <div className={styles.anexos}>
        <h3>Anexos</h3>
        <button className={styles.upload}>Adicionar Arquivo</button>
        <ul>
          <li>Arquivo1.pdf</li>
          <li>Arquivo2.jpg</li>
        </ul>
      </div>
    </div>
  );
}
