// Langas: Testo kūrimo langas
// Panaudojimo atvejis: Sukurti testą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TestoForma } from "./TestoForma";

export function TestoKurimoLangas() {
  const [rezultatas, setRezultatas] = useState<"" | "sukurta" | "klaida">("");

  function issaugoti(klausimuSkaicius: number) {
    // Testas turi turėti bent vieną klausimą
    setRezultatas(klausimuSkaicius > 0 ? "sukurta" : "klaida");
  }

  return (
    <Page langas="Testo kūrimo langas" title="Naujas testas">
      {rezultatas === "sukurta" && <Alert variant="success"><AlertDescription>Testas, klausimai ir atsakymų variantai sėkmingai sukurti.</AlertDescription></Alert>}
      {rezultatas === "klaida" && <Alert variant="destructive"><AlertDescription>Testas turi turėti bent vieną klausimą.</AlertDescription></Alert>}
      <TestoForma issaugoti={issaugoti} />
    </Page>
  );
}
