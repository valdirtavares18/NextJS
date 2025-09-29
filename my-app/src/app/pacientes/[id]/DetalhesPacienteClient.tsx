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
  const [form, setForm] = useState<Paciente | null>(null);
  const [anexos, setAnexos] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchPaciente = async () => {
    try {
      const res = await fetch(`/api/pacientes`);
      const data: Paciente[] = await res.json();
      const found = data.find((p) => p.id === Number(pacienteId));
      setPaciente(found || null);
      setForm(found || null);
    } catch (err) {
      console.error("Erro ao buscar paciente:", err);
    }
  };

  const fetchAnexos = async () => {
    try {
      const res = await fetch(`/api/pacientes/${pacienteId}/anexos`);
      const files: string[] = await res.json();
      setAnexos(files);
    } catch (err) {
      console.error("Erro ao buscar anexos:", err);
    }
  };

  useEffect(() => {
    fetchPaciente();
    fetchAnexos();
  }, [pacienteId]);

  if (!paciente || !form) return <p>Carregando paciente...</p>;

  const handleChange = (key: keyof Paciente, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/pacientes/${pacienteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setPaciente(form);
      alert("Paciente atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar paciente.");
    }
  };

  const handleCancel = () => setForm(paciente);

  const handleDelete = async () => {
    if (!confirm("Deseja realmente excluir este paciente?")) return;
    try {
      await fetch(`/api/pacientes/${pacienteId}`, { method: "DELETE" });
      alert("Paciente excluído!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir paciente.");
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await fetch(`/api/pacientes/${pacienteId}/anexos`, { method: "POST", body: formData });
      setFile(null);
      fetchAnexos();
      alert("Arquivo enviado!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar arquivo.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Editar Paciente</h2>

      {["nome","dataNascimento","telefone","cep","logradouro","numero","complemento","bairro","cidade","estado"].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input
            type={field === "dataNascimento" ? "date" : "text"}
            value={form[field as keyof Paciente] || ""}
            onChange={(e) => handleChange(field as keyof Paciente, e.target.value)}
          />
        </label>
      ))}

      <div className={styles.actions}>
        <button className={styles.save} onClick={handleSave}>Salvar</button>
        <button className={styles.cancel} onClick={handleCancel}>Cancelar</button>
        <button className={styles.edit} onClick={() => alert("Modo de edição já ativo")}>Editar</button>
        <button className={styles.delete} onClick={handleDelete}>Excluir</button>
      </div>

      <div className={styles.anexos}>
        <h3>Anexos</h3>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className={styles.upload} onClick={handleFileUpload}>Adicionar Arquivo</button>
        <ul className={styles.lista}>
          {anexos.map((a) => (
            <li key={a} className={styles.item}>
              <a
                href={`/api/pacientes/${pacienteId}/anexos/${encodeURIComponent(a)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {a}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
