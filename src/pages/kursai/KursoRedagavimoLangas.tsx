// Langas: Kurso redagavimo langas
// Panaudojimo atvejis: Redaguoti kursą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { rastiKursa } from "@/data/duomenys";
import { KursoForma } from "./KursoForma";

export function KursoRedagavimoLangas() {
  const { id } = useParams();
  const [issaugota, setIssaugota] = useState(false);

  return (
    <Page langas="Kurso redagavimo langas" title="Redaguoti kursą">
      {issaugota && <Alert variant="success"><AlertDescription>Kursas sėkmingai atnaujintas.</AlertDescription></Alert>}
      <KursoForma kursas={rastiKursa(id)} issaugoti={() => setIssaugota(true)} />
    </Page>
  );
}
