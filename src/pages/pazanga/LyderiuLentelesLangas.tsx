// Langas: Lyderių lentelės langas
// Panaudojimo atvejis: Peržiūrėti lyderių lentelę
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Trophy } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KURSAI, LYDERIAI } from "@/data/duomenys";

const PRIZU_SPALVOS = ["text-amber-500", "text-slate-400", "text-orange-700"]; // aukso, sidabro, bronzos

export function LyderiuLentelesLangas() {
  const studentoKursai = KURSAI.slice(0, 3);
  const [kursas, setKursas] = useState(studentoKursai[0].pavadinimas);

  return (
    <Page langas="Lyderių lentelės langas" title="Lyderių lentelė">
      <div className="max-w-sm">
        <Field label="Kursas">
          <Select value={kursas} onChange={(e) => setKursas(e.target.value)}>
            {studentoKursai.map((k) => <option key={k.id}>{k.pavadinimas}</option>)}
          </Select>
        </Field>
      </div>

      <Card className="max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Vieta</TableHead>
              <TableHead>Studentas</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LYDERIAI.map((l) => {
              const yraMano = l.vardas.includes("(jūs)");
              return (
                <TableRow key={l.vieta} className={yraMano ? "bg-primary/10 font-medium" : ""}>
                  <TableCell>
                    {l.vieta <= 3 ? <Trophy className={`h-4 w-4 ${PRIZU_SPALVOS[l.vieta - 1]}`} /> : l.vieta}
                  </TableCell>
                  <TableCell>{l.vardas}</TableCell>
                  <TableCell className="text-right">{l.xp}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
