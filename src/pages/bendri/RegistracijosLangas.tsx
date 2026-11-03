// Langas: Registracijos langas
// Panaudojimo atvejis: Registruotis
// Navigacija: → Kodo įvedimo langas (po sėkmingos registracijos)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PomegiuPasirinkimas } from "./PomegiuPasirinkimas";

export function RegistracijosLangas() {
  const navigate = useNavigate();

  const [vardas, setVardas] = useState("");
  const [pavarde, setPavarde] = useState("");
  const [elPastas, setElPastas] = useState("");
  const [slaptazodis, setSlaptazodis] = useState("");
  const [pomegiai, setPomegiai] = useState<string[]>(["IT"]);
  const [klaida, setKlaida] = useState("");

  function registruotis() {
    if (!vardas || !pavarde || !elPastas.includes("@") || slaptazodis.length < 8) {
      setKlaida("Užpildykite visus laukus teisingai.");
      return;
    }
    if (elPastas === "jonas@noodle.lt") {
      setKlaida("Šis el. paštas jau užimtas.");
      return;
    }
    // Sistema sukuria neaktyvią paskyrą ir išsiunčia patvirtinimo kodą
    navigate("/kodas?nuo=registracija");
  }

  return (
    <Page langas="Registracijos langas" title="Registracija" subtitle="Po registracijos el. paštu gausite patvirtinimo kodą.">
      <Card className="mx-auto max-w-xl">
        <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
          {klaida && (
            <Alert variant="destructive" className="sm:col-span-2">
              <AlertDescription>{klaida}</AlertDescription>
            </Alert>
          )}
          <Field label="Vardas"><Input value={vardas} onChange={(e) => setVardas(e.target.value)} /></Field>
          <Field label="Pavardė"><Input value={pavarde} onChange={(e) => setPavarde(e.target.value)} /></Field>
          <Field label="El. paštas"><Input type="email" value={elPastas} onChange={(e) => setElPastas(e.target.value)} /></Field>
          <Field label="Slaptažodis" hint="Bent 8 simboliai">
            <Input type="password" value={slaptazodis} onChange={(e) => setSlaptazodis(e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Pomėgių sritys">
              <PomegiuPasirinkimas pasirinktos={pomegiai} onChange={setPomegiai} />
            </Field>
          </div>
          <Button className="sm:col-span-2" onClick={registruotis}><UserPlus /> Registruotis</Button>
        </CardContent>
      </Card>
    </Page>
  );
}
