// Langas: Mano kursų sąrašo langas (dėstytojo kursai)
// Panaudojimo atvejai: Sukurti kursą, Redaguoti kursą, Peržiūrėti kurso statistiką, Sukurti testą, Sukurti užduotį ir kt.
// Navigacija: → Kurso kūrimo, Kurso redagavimo, Kurso statistikos, Kurso užsiėmimų sąrašo langai

import { Link } from "react-router-dom";
import { BarChart3, ListChecks, Pencil, Plus } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KURSAI, MANO_KURSU_ID } from "@/data/duomenys";
import { KursoBusena } from "./KursoKortele";

export function ManoKursuSarasoLangas() {
  const manoKursai = KURSAI.filter((k) => MANO_KURSU_ID.includes(k.id));

  return (
    <Page
      langas="Mano kursų sąrašo langas"
      title="Mano kursai"
      actions={<Button asChild><Link to="/mano-kursai/naujas"><Plus /> Sukurti kursą</Link></Button>}
    >
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kursas</TableHead>
              <TableHead>Būsena</TableHead>
              <TableHead>Dalyviai</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manoKursai.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="font-medium">{k.pavadinimas}</TableCell>
                <TableCell><KursoBusena busena={k.busena} /></TableCell>
                <TableCell>{k.dalyviai}</TableCell>
                <TableCell className="space-x-1 whitespace-nowrap text-right">
                  <Button size="sm" variant="outline" asChild><Link to={`/kursai/${k.id}/uzsiemimai`}><ListChecks /> Užsiėmimai</Link></Button>
                  <Button size="sm" variant="outline" asChild><Link to={`/mano-kursai/${k.id}/redaguoti`}><Pencil /> Redaguoti</Link></Button>
                  <Button size="sm" variant="outline" asChild><Link to={`/mano-kursai/${k.id}/statistika`}><BarChart3 /> Statistika</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
