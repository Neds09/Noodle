// Langas: Naudotojų sąrašo langas
// Panaudojimo atvejis: Šalinti profilį
// Navigacija: → Šalinimo patvirtinimo langas (dialogas)

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SalinimoPatvirtinimoLangas } from "@/pages/bendri/SalinimoPatvirtinimoLangas";
import { NAUDOTOJAI } from "@/data/duomenys";

type Naudotojas = (typeof NAUDOTOJAI)[number];

export function NaudotojuSarasoLangas() {
  const [naudotojai, setNaudotojai] = useState(NAUDOTOJAI);
  const [salinamas, setSalinamas] = useState<Naudotojas | null>(null);
  const [pranesimas, setPranesimas] = useState("");

  function pasalintiNaudotoja() {
    if (!salinamas) return;
    setNaudotojai(naudotojai.filter((n) => n.id !== salinamas.id));
    setPranesimas("Paskyra pašalinta, naudotojui išsiųstas pranešimas el. paštu.");
  }

  return (
    <Page langas="Naudotojų sąrašo langas" title="Naudotojai">
      {pranesimas && <Alert variant="success"><AlertDescription>{pranesimas}</AlertDescription></Alert>}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vardas</TableHead>
              <TableHead>El. paštas</TableHead>
              <TableHead>Rolė</TableHead>
              <TableHead>Registruotas</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {naudotojai.map((n) => {
              // Administratoriaus šalinti negalima
              const galimaSalinti = n.role !== "Administratorius";
              return (
                <TableRow key={n.id}>
                  <TableCell className="font-medium">{n.vardas}</TableCell>
                  <TableCell>{n.elPastas}</TableCell>
                  <TableCell><Badge variant="secondary">{n.role}</Badge></TableCell>
                  <TableCell>{n.registruotas}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" disabled={!galimaSalinti} onClick={() => setSalinamas(n)}>
                      <Trash2 /> Šalinti
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <SalinimoPatvirtinimoLangas
        atidarytas={salinamas !== null}
        uzdaryti={() => setSalinamas(null)}
        kaSalinama={`naudotojo paskyra „${salinamas?.vardas}“`}
        ispejimas={salinamas?.role === "Dėstytojas" ? "Dėstytojo aktyvūs kursai bus archyvuoti." : undefined}
        patvirtinti={pasalintiNaudotoja}
      />
    </Page>
  );
}
