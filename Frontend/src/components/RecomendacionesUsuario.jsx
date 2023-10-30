import useRecs from "../hooks/useRecs";
import { MensajeError } from "./MensajeError";
import { RecList } from "./ListaRecomendaciones";
import { ScrollToTopButton } from "../components/Scroll";

export const UserRecs = ({ id }) => {
  const { recs, loading, error, removeRec } = useRecs(id);

  if (loading) return <p>Cargando recomendaciones...</p>;
  if (error) return <MensajeError message={error} />;

  return (
    <>
      <RecList recs={recs} removeRec={removeRec} />
      <ScrollToTopButton />
    </>
  );
};
