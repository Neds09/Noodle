// Langas: Laukiančių kursų sąrašo langas
// Panaudojimo atvejis: Patvirtinti kursą
// Navigacija: → Kurso aprašo langas

import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KURSAI } from "@/data/duomenys";

export function LaukianciuKursuSarasoLangas() {
  const laukiantys = KURSAI.filter((k) => k.busena === "Laukia patvirtinimo");

  return (
    <Page langas="Laukiančių kursų sąrašo langas" title="Kursai, laukiantys patvirtinimo">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kursas</TableHead>
              <TableHead>Kategorija</TableHead>
              <TableHead>Dėstytojas</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laukiantys.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="font-medium">{k.pavadinimas}</TableCell>
                <TableCell>{k.kategorija}</TableCell>
                <TableCell>{k.destytojas}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" asChild><Link to={`/kursai/${k.id}`}><Eye /> Peržiūrėti</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
