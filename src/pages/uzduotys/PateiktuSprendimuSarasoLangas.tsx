// Langas: Pateiktų sprendimų sąrašo langas
// Panaudojimo atvejis: Įvertinti užduotį
// Navigacija: → Sprendimo vertinimo langas

import { Link, useParams } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SPRENDIMAI, rastiUzduoti } from "@/data/duomenys";

function SprendimoBusena({ busena }: { busena: string }) {
  if (busena === "Įvertinta") return <Badge variant="success">{busena}</Badge>;
  if (busena === "Vėluojama") return <Badge variant="warning">{busena}</Badge>;
  return <Badge variant="secondary">{busena}</Badge>;
}

export function PateiktuSprendimuSarasoLangas() {
  const { id, taskId } = useParams();
  const uzduotis = rastiUzduoti(taskId);

  return (
    <Page langas="Pateiktų sprendimų sąrašo langas" title={`Sprendimai: ${uzduotis.pavadinimas}`}>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Studentas</TableHead>
              <TableHead>Pateikta</TableHead>
              <TableHead>Failas</TableHead>
              <TableHead>Būsena</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SPRENDIMAI.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.studentas}</TableCell>
                <TableCell>{s.pateikta}</TableCell>
                <TableCell className="font-mono text-xs">{s.failas}</TableCell>
                <TableCell><SprendimoBusena busena={s.busena} /></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" asChild>
                    <Link to={`/kursai/${id}/uzduotys/${uzduotis.id}/sprendimai/${s.id}`}><ClipboardCheck /> Vertinti</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
