// Langas: Prisijungimo langas
// Panaudojimo atvejis: Prisijungti
// Navigacija: → Pagrindinis langas (sėkmingai prisijungus)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRole } from "@/lib/role";
import type { Role } from "@/data/duomenys";

export function PrisijungimoLangas() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const [elPastas, setElPastas] = useState("");
  const [slaptazodis, setSlaptazodis] = useState("");
  const [prisijungtiKaip, setPrisijungtiKaip] = useState<Role>("Studentas");
  const [klaida, setKlaida] = useState(false);

  function prisijungti() {
    const duomenysTeisingi = elPastas.includes("@") && slaptazodis.length >= 3;
    if (!duomenysTeisingi) {
      setKlaida(true);
      return;
    }
    setRole(prisijungtiKaip);
    navigate("/");
  }

  return (
    <Page langas="Prisijungimo langas" title="Prisijungimas">
      <Card className="mx-auto max-w-md">
        <CardContent className="space-y-4 pt-5">
          {klaida && (
            <Alert variant="destructive">
              <AlertDescription>Neteisingi prisijungimo duomenys.</AlertDescription>
            </Alert>
          )}
          <Field label="El. paštas">
            <Input type="email" value={elPastas} onChange={(e) => setElPastas(e.target.value)} placeholder="vardas@noodle.lt" />
          </Field>
          <Field label="Slaptažodis">
            <Input type="password" value={slaptazodis} onChange={(e) => setSlaptazodis(e.target.value)} />
          </Field>
          <Field label="Prisijungti kaip (demonstracijai)">
            <Select value={prisijungtiKaip} onChange={(e) => setPrisijungtiKaip(e.target.value as Role)}>
              <option>Studentas</option>
              <option>Dėstytojas</option>
              <option>Administratorius</option>
            </Select>
          </Field>
          <Button className="w-full" onClick={prisijungti}><LogIn /> Prisijungti</Button>
        </CardContent>
      </Card>
    </Page>
  );
}
