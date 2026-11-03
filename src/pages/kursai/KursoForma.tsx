// Kurso duomenų forma (naudojama Kurso kūrimo ir Kurso redagavimo languose).

import { Save } from "lucide-react";
import { Field } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { KURSAI, SRITYS, SUDETINGUMO_LYGIAI, type Kursas } from "@/data/duomenys";

interface Props {
  kursas?: Kursas; // jei perduotas – redaguojamas esamas kursas
  issaugoti: () => void;
}

export function KursoForma({ kursas, issaugoti }: Props) {
  const mygtukoTekstas = kursas ? "Išsaugoti pakeitimus" : "Sukurti ir pateikti patvirtinimui";

  return (
    <Card className="max-w-2xl">
      <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Pavadinimas"><Input defaultValue={kursas?.pavadinimas} /></Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Aprašas"><Textarea defaultValue={kursas?.aprasas} /></Field>
        </div>
        <Field label="Kategorija">
          <Select defaultValue={kursas?.kategorija}>
            {SRITYS.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Sudėtingumo lygis">
          <Select defaultValue={kursas?.sudetingumas}>
            {SUDETINGUMO_LYGIAI.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Reikalavimai (baigti kursai)">
            <Select defaultValue={kursas?.reikalavimai ?? "Nėra"}>
              <option>Nėra</option>
              {KURSAI.map((k) => <option key={k.id}>{k.pavadinimas}</option>)}
            </Select>
          </Field>
        </div>
        <Button className="sm:col-span-2" onClick={issaugoti}><Save /> {mygtukoTekstas}</Button>
      </CardContent>
    </Card>
  );
}
