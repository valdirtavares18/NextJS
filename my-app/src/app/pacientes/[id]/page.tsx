import DetalhesPacienteClient from "./DetalhesPacienteClient";

type Props = {
  params: {
    id: string;
  };
};

export default function DetalhesPacientePage({ params }: Props) {
  const { id } = params;

  return <DetalhesPacienteClient pacienteId={id} />;
}
