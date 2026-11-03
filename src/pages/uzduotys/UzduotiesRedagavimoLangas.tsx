// Langas: Užduoties redagavimo langas
// Panaudojimo atvejis: Redaguoti užduotį
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { rastiUzduoti } from "@/data/duomenys";
import { UzduotiesForma } from "./UzduotiesForma";

export function UzduotiesRedagavimoLangas() {
  const { taskId } = useParams();
  const [issaugota, setIssaugota] = useState(false);

  return (
    <Page langas="Užduoties redagavimo langas" title="Redaguoti užduotį">
      {issaugota && (
        <Alert variant="success">
          <AlertDescription>Užduotis atnaujinta. Pakeitus terminą, pateiktų sprendimų būsenos perskaičiuotos.</AlertDescription>
        </Alert>
      )}
      <UzduotiesForma uzduotis={rastiUzduoti(taskId)} issaugoti={() => setIssaugota(true)} />
    </Page>
  );
}
