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
    estado: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";

    if (form.dataNascimento && isNaN(Date.parse(form.dataNascimento)))
      errs.dataNascimento = "Data inválida";

    if (form.telefone && !/^\d{10,11}$/.test(form.telefone.replace(/\D/g, "")))
      errs.telefone = "Telefone deve ter 10 ou 11 números";

    if (form.cep && !/^\d{8}$/.test(form.cep)) errs.cep = "CEP deve ter 8 números";

    if (form.numero && !/^\d+$/.test(form.numero)) errs.numero = "Número deve ser numérico";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    await fetch("/api/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
  }

  async function buscarCEP() {
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
  }

  const handleChange = (field: string, value: string) => {
    if (field === "telefone") value = value.replace(/\D/g, ""); // só números
    if (field === "cep") value = value.replace(/\D/g, "");
    if (field === "numero") value = value.replace(/\D/g, "");
    setForm({ ...form, [field]: value });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Novo Paciente</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { label: "Nome Completo*", field: "nome", type: "text" },
          { label: "Data de Nascimento", field: "dataNascimento", type: "date" },
          { label: "Telefone", field: "telefone", type: "tel" },
          { label: "CEP", field: "cep", type: "text" },
          { label: "Logradouro", field: "logradouro", type: "text" },
          { label: "Número", field: "numero", type: "text" },
          { label: "Complemento", field: "complemento", type: "text" },
          { label: "Bairro", field: "bairro", type: "text" },
          { label: "Cidade", field: "cidade", type: "text" },
          { label: "Estado", field: "estado", type: "text" },
        ].map(({ label, field, type }) => (
          <label key={field} className={styles.label}>
            {label}
            <input
              type={type}
              required={field === "nome"}
              className={styles.input}
              value={form[field as keyof typeof form]}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={field === "cep" ? buscarCEP : undefined}
            />
            {errors[field] && <span className={styles.error}>{errors[field]}</span>}
          </label>
        ))}

        <button type="submit" className={styles.submit}>
          Salvar
        </button>
      </form>
    </div>
  );
}
