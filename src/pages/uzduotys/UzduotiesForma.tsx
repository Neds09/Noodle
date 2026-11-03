// Užduoties forma (naudojama Užduoties kūrimo ir Užduoties redagavimo languose).

import { Save } from "lucide-react";
import { Field } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { UZSIEMIMAI, type Uzduotis } from "@/data/duomenys";

interface Props {
  uzduotis?: Uzduotis; // jei perduota – redaguojama esama užduotis
  issaugoti: () => void;
}

export function UzduotiesForma({ uzduotis, issaugoti }: Props) {
  // datetime-local laukui reikia formato „2026-11-15T23:59“
  const terminas = uzduotis ? uzduotis.terminas.replace(" ", "T") : "";

  return (
    <Card className="max-w-2xl">
      <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Pavadinimas"><Input defaultValue={uzduotis?.pavadinimas} /></Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Aprašymas"><Textarea defaultValue={uzduotis?.aprasymas} /></Field>
        </div>
        <Field label="Terminas"><Input type="datetime-local" defaultValue={terminas} /></Field>
        <Field label="Maksimalus balas"><Input type="number" defaultValue={uzduotis?.maksimalusBalas ?? 10} /></Field>
        <div className="sm:col-span-2">
          <Field label="Užsiėmimas">
            <Select>
              {UZSIEMIMAI.map((u) => <option key={u.id}>{u.pavadinimas}</option>)}
            </Select>
          </Field>
        </div>
        <Button className="sm:col-span-2" onClick={issaugoti}><Save /> Išsaugoti</Button>
      </CardContent>
    </Card>
  );
}
