/*
  Warnings:

  - The primary key for the `Paciente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `atualizado_em` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `criado_em` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `nome_completo` on the `Paciente` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Paciente` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `nome` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT,
    "telefone" TEXT
);
INSERT INTO "new_Paciente" ("id", "telefone") SELECT "id", "telefone" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
