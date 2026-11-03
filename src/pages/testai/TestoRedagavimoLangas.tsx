// Langas: Testo redagavimo langas
// Panaudojimo atvejis: Redaguoti testą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { rastiTesta } from "@/data/duomenys";
import { TestoForma } from "./TestoForma";

export function TestoRedagavimoLangas() {
  const { testId } = useParams();
  const testas = rastiTesta(testId);
  const [issaugota, setIssaugota] = useState(false);

  // Demonstracijai: 2-ą testą jau sprendė studentai, todėl jo redaguoti negalima
  const jauSprende = testas.id === 2;

  return (
    <Page langas="Testo redagavimo langas" title={`Redaguoti: ${testas.pavadinimas}`}>
      {jauSprende && <Alert variant="destructive"><AlertDescription>Šį testą jau sprendė studentai – redaguoti negalima.</AlertDescription></Alert>}
      {issaugota && <Alert variant="success"><AlertDescription>Testas sėkmingai atnaujintas.</AlertDescription></Alert>}
      <TestoForma testas={testas} uzrakinta={jauSprende} issaugoti={() => setIssaugota(true)} />
    </Page>
  );
}
