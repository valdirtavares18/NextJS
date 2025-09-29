"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function NovoPaciente() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/"); // volta para homepage dinâmica
  };

  const buscarCEP = async () => {
    if (form.cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar CEP", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Novo Paciente</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome Completo*
          <input
            type="text"
            required
            className={styles.input}
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Data de Nascimento
          <input
            type="date"
            className={styles.input}
            value={form.dataNascimento}
            onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Telefone
          <input
            type="tel"
            className={styles.input}
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          CEP
          <input
            type="text"
            className={styles.input}
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
            onBlur={buscarCEP}
          />
        </label>

        <label className={styles.label}>
          Logradouro
          <input
            type="text"
            className={styles.input}
            value={form.logradouro}
            onChange={(e) => setForm({ ...form, logradouro: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Número
          <input
            type="text"
            className={styles.input}
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Complemento
          <input
            type="text"
            className={styles.input}
            value={form.complemento}
            onChange={(e) => setForm({ ...form, complemento: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Bairro
          <input
            type="text"
            className={styles.input}
            value={form.bairro}
            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Cidade
          <input
            type="text"
            className={styles.input}
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          />
        </label>

        <label className={styles.label}>
          Estado
          <input
            type="text"
            className={styles.input}
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
          />
        </label>

        <button type="submit" className={styles.submit}>
          Salvar
        </button>
      </form>
    </div>
  );
}
