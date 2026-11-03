// Langas: Pažangos langas
// Panaudojimo atvejis: Peržiūrėti pažangą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Field, Page } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KURSAI } from "@/data/duomenys";
import { ProcentuEilute, Rodiklis } from "./Rodiklis";

export function PazangosLangas() {
  const studentoKursai = KURSAI.slice(0, 3);
  const [kursas, setKursas] = useState(studentoKursai[0].pavadinimas);

  return (
    <Page langas="Pažangos langas" title="Mano pažanga">
      <div className="max-w-sm">
        <Field label="Kursas">
          <Select value={kursas} onChange={(e) => setKursas(e.target.value)}>
            {studentoKursai.map((k) => <option key={k.id}>{k.pavadinimas}</option>)}
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Rodiklis pavadinimas="Baigta užsiėmimų" reiksme="67 %" paaiskinimas="2 iš 3" />
        <Rodiklis pavadinimas="Testų vidurkis" reiksme="78 %" />
        <Rodiklis pavadinimas="Praleistas laikas" reiksme="6 h 40 min" />
        <Rodiklis pavadinimas="Surinkta XP" reiksme="640" paaiskinimas="+120 šią savaitę" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Užsiėmimų eiga</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ProcentuEilute pavadinimas="1. Įvadas ir aplinkos paruošimas" procentai={100} />
          <ProcentuEilute pavadinimas="2. Kintamieji ir duomenų tipai" procentai={100} />
          <ProcentuEilute pavadinimas="3. Sąlygos ir ciklai" procentai={20} />
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vertinimas</TableHead>
              <TableHead>Tipas</TableHead>
              <TableHead className="text-right">Rezultatas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Įvado testas</TableCell><TableCell>Testas</TableCell><TableCell className="text-right">4 / 6</TableCell></TableRow>
            <TableRow><TableCell>Duomenų tipų testas</TableCell><TableCell>Testas</TableCell><TableCell className="text-right">5 / 6</TableCell></TableRow>
            <TableRow><TableCell>Skaičiuotuvas</TableCell><TableCell>Užduotis</TableCell><TableCell className="text-right">8 / 10</TableCell></TableRow>
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
