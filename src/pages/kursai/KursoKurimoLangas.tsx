// Langas: Kurso kūrimo langas
// Panaudojimo atvejis: Sukurti kursą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KursoForma } from "./KursoForma";

export function KursoKurimoLangas() {
  const [sukurta, setSukurta] = useState(false);

  return (
    <Page langas="Kurso kūrimo langas" title="Naujas kursas">
      {sukurta && (
        <Alert variant="success">
          <AlertDescription>Kursas sukurtas ir pateiktas patvirtinimui (būsena „Laukia patvirtinimo“).</AlertDescription>
        </Alert>
      )}
      <KursoForma issaugoti={() => setSukurta(true)} />
    </Page>
  );
}
