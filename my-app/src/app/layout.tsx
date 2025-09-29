import "./globals.css";
import styles from "./styles/Layout.module.css";

export const metadata = {
  title: "Gestão de Pacientes",
  description: "CRUD de Ficha de Paciente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>
        <header className={styles.header}>
          <h1 className={styles.logo}>Personaliza Medic</h1>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          &copy; {new Date().getFullYear()} - Personaliza
        </footer>
      </body>
    </html>
  );
}
