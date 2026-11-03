// Langas: Užduoties kūrimo langas
// Panaudojimo atvejis: Sukurti užduotį
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UzduotiesForma } from "./UzduotiesForma";

export function UzduotiesKurimoLangas() {
  const [sukurta, setSukurta] = useState(false);

  return (
    <Page langas="Užduoties kūrimo langas" title="Nauja užduotis">
      {sukurta && <Alert variant="success"><AlertDescription>Užduotis sėkmingai sukurta.</AlertDescription></Alert>}
      <UzduotiesForma issaugoti={() => setSukurta(true)} />
    </Page>
  );
}
