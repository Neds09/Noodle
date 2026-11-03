// Langas: Rizikos studentų langas
// Panaudojimo atvejis: Nustatyti rizikos studentus
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Mail } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KURSAI, RIZIKOS_STUDENTAI } from "@/data/duomenys";

export function RizikosStudentuLangas() {
  const kursai = KURSAI.filter((k) => k.busena === "Paskelbtas");
  const [kursas, setKursas] = useState(kursai[0].pavadinimas);
  const [pazymeti, setPazymeti] = useState<string[]>([]);
  const [issiusta, setIssiusta] = useState(0);

  // Demonstracijai: kulinarijos kurse rizikos studentų nėra
  const yraRizikosStudentu = kursas !== "Itališka virtuvė namuose";

  function pakeistiKursa(naujas: string) {
    setKursas(naujas);
    setPazymeti([]);
    setIssiusta(0);
  }

  function perjungtiStudenta(vardas: string) {
    if (pazymeti.includes(vardas)) {
      setPazymeti(pazymeti.filter((v) => v !== vardas));
    } else {
      setPazymeti([...pazymeti, vardas]);
    }
  }

  return (
    <Page
      langas="Rizikos studentų langas"
      title="Rizikos studentai"
      subtitle="Rizikos balas skaičiuojamas pagal aktyvumą, pažangos tempą, testų rezultatus ir praleistus terminus."
    >
      <div className="max-w-sm">
        <Field label="Kursas">
          <Select value={kursas} onChange={(e) => pakeistiKursa(e.target.value)}>
            {kursai.map((k) => <option key={k.id}>{k.pavadinimas}</option>)}
          </Select>
        </Field>
      </div>

      {!yraRizikosStudentu && <Alert variant="info"><AlertDescription>Šiame kurse rizikos studentų nėra.</AlertDescription></Alert>}

      {yraRizikosStudentu && (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>Studentas</TableHead>
                  <TableHead>Rizikos balas</TableHead>
                  <TableHead>Priežastis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RIZIKOS_STUDENTAI.map((r) => (
                  <TableRow key={r.studentas}>
                    <TableCell>
                      <input type="checkbox" checked={pazymeti.includes(r.studentas)} onChange={() => perjungtiStudenta(r.studentas)} />
                    </TableCell>
                    <TableCell className="font-medium">{r.studentas}</TableCell>
                    <TableCell><Badge variant={r.balas >= 75 ? "destructive" : "warning"}>{r.balas}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{r.priezastis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Button disabled={pazymeti.length === 0} onClick={() => setIssiusta(pazymeti.length)}>
            <Mail /> Siųsti įspėjimą pasirinktiems
          </Button>
          {issiusta > 0 && <Alert variant="success"><AlertDescription>Įspėjimai išsiųsti el. paštu {issiusta} studentams.</AlertDescription></Alert>}
        </>
      )}
    </Page>
  );
}
