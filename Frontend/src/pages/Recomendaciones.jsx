import useRecs from "../hooks/useRecs";

import { RecList } from "../components/ListaRecomendaciones";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

import { ScrollToTopButton } from "../components/Scroll";

export const Recomendaciones = () => {
  const { recs, error, loading, removeRec } = useRecs();

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="pagina-recomendaciones">
      <RecList recs={recs} removeRec={removeRec} />
      <ScrollToTopButton />
    </section>
  );
};
