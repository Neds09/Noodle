// Langas: Profilio redagavimo langas
// Panaudojimo atvejis: Redaguoti profilį
// Navigacija: → Kodo įvedimo langas (jei pakeistas el. paštas)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PomegiuPasirinkimas } from "@/pages/bendri/PomegiuPasirinkimas";

const DABARTINIS_EL_PASTAS = "jonas@noodle.lt";

export function ProfilioRedagavimoLangas() {
  const navigate = useNavigate();
  const [elPastas, setElPastas] = useState(DABARTINIS_EL_PASTAS);
  const [pomegiai, setPomegiai] = useState(["IT", "Kalbos", "Muzika"]);
  const [issaugota, setIssaugota] = useState(false);

  function issaugoti() {
    if (elPastas !== DABARTINIS_EL_PASTAS) {
      // Naują el. paštą reikia patvirtinti kodu
      navigate("/kodas?nuo=profilis");
      return;
    }
    setIssaugota(true);
  }

  return (
    <Page langas="Profilio redagavimo langas" title="Redaguoti profilį">
      <Card className="max-w-2xl">
        <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
          {issaugota && (
            <Alert variant="success" className="sm:col-span-2">
              <AlertDescription>Profilis sėkmingai atnaujintas.</AlertDescription>
            </Alert>
          )}
          <Field label="Vardas"><Input defaultValue="Jonas" /></Field>
          <Field label="Pavardė"><Input defaultValue="Petraitis" /></Field>
          <Field label="El. paštas" hint="Pakeitus el. paštą reikės jį patvirtinti kodu.">
            <Input value={elPastas} onChange={(e) => setElPastas(e.target.value)} />
          </Field>
          <Field label="Telefono numeris"><Input defaultValue="+370 600 12345" /></Field>
          <div className="sm:col-span-2">
            <Field label="Apie mane"><Textarea defaultValue="Informatikos studentas, domiuosi programavimu ir muzika." /></Field>
          </div>
          <Field label="Profilio nuotrauka"><Input type="file" accept="image/*" /></Field>
          <div className="sm:col-span-2">
            <Field label="Pomėgių sritys"><PomegiuPasirinkimas pasirinktos={pomegiai} onChange={setPomegiai} /></Field>
          </div>
          <Button className="sm:col-span-2" onClick={issaugoti}><Save /> Išsaugoti</Button>
        </CardContent>
      </Card>
    </Page>
  );
}
