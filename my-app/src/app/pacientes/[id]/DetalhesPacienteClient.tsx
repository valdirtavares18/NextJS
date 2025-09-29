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

  // Buscar paciente
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

  // Buscar anexos
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

  // Handlers
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

  const handleCancel = () => {
    setForm(paciente);
  };

  const handleDelete = async () => {
    if (!confirm("Deseja realmente excluir este paciente?")) return;
    try {
      await fetch(`/api/pacientes/${pacienteId}`, { method: "DELETE" });
      alert("Paciente excluído com sucesso!");
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
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar arquivo.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Editar Paciente</h2>

      <label>
        Nome:
        <input
          type="text"
          value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />
      </label>

      <label>
        Data Nascimento:
        <input
          type="date"
          value={form.dataNascimento || ""}
          onChange={(e) => handleChange("dataNascimento", e.target.value)}
        />
      </label>

      <label>
        Telefone:
        <input
          type="tel"
          value={form.telefone || ""}
          onChange={(e) => handleChange("telefone", e.target.value)}
        />
      </label>

      <label>
        CEP:
        <input
          type="text"
          value={form.cep || ""}
          onChange={(e) => handleChange("cep", e.target.value)}
        />
      </label>

      <label>
        Logradouro:
        <input
          type="text"
          value={form.logradouro || ""}
          onChange={(e) => handleChange("logradouro", e.target.value)}
        />
      </label>

      <label>
        Número:
        <input
          type="text"
          value={form.numero || ""}
          onChange={(e) => handleChange("numero", e.target.value)}
        />
      </label>

      <label>
        Complemento:
        <input
          type="text"
          value={form.complemento || ""}
          onChange={(e) => handleChange("complemento", e.target.value)}
        />
      </label>

      <label>
        Bairro:
        <input
          type="text"
          value={form.bairro || ""}
          onChange={(e) => handleChange("bairro", e.target.value)}
        />
      </label>

      <label>
        Cidade:
        <input
          type="text"
          value={form.cidade || ""}
          onChange={(e) => handleChange("cidade", e.target.value)}
        />
      </label>

      <label>
        Estado:
        <input
          type="text"
          value={form.estado || ""}
          onChange={(e) => handleChange("estado", e.target.value)}
        />
      </label>

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
            <li className={styles.item} key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
