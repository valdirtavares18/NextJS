# Personaliza Medic - Projeto de Gestão de Pacientes

Este projeto é uma aplicação web construída com Next.js, TypeScript e Prisma (SQLite), para gerenciar pacientes, incluindo cadastro, edição, exclusão e upload/download de arquivos.

---

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js (versão >= 18)
- npm ou yarn
- Git (para clonar o repositório)

---

## Como rodar o projeto

1. Clone o repositório:
   git clone <link-do-seu-repo>
   
2. Entre na pasta do projeto:
   cd <nome-da-pasta-do-projeto>

3. Instale as dependências:
   npm install
   # ou, se usar yarn:
   yarn install

4. Configure o banco de dados (SQLite):
   - O arquivo `.env` deve conter a URL do banco:
     DATABASE_URL="file:./dev.db"

5. Gere o cliente Prisma e aplique as migrations:
   npx prisma migrate dev --name init
   npx prisma generate

6. Rode a aplicação:
   npm run dev
   # ou, se usar yarn:
   yarn dev

7. Abra o navegador e acesse:
   http://localhost:3000

---

## Funcionalidades

- Listagem de pacientes na homepage
- Cadastro de novo paciente com validação e busca de CEP
- Visualização, edição e exclusão de pacientes
- Upload e download de anexos por paciente

---

## Observações

- Todos os dados são salvos no banco SQLite (`dev.db`)
- Os arquivos enviados ficam na pasta `uploads/` dentro do projeto
