// Langas: Apdovanojimų valdymo langas
// Panaudojimo atvejis: Skirti apdovanojimus
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Award, Play, Sparkles } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { APDOVANOJIMAI } from "@/data/duomenys";

export function ApdovanojimuValdymoLangas() {
  const [skyrimasPaleistas, setSkyrimasPaleistas] = useState(false);

  return (
    <Page
      langas="Apdovanojimų valdymo langas"
      title="Apdovanojimai"
      actions={<Button onClick={() => setSkyrimasPaleistas(true)}><Play /> Paleisti apdovanojimų skyrimą</Button>}
    >
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apdovanojimas</TableHead>
              <TableHead>Kriterijus</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {APDOVANOJIMAI.map((a) => (
              <TableRow key={a.pavadinimas}>
                <TableCell className="font-medium"><Award className="mr-1.5 inline h-4 w-4 text-primary" />{a.pavadinimas}</TableCell>
                <TableCell>{a.kriterijus}</TableCell>
                <TableCell className="text-right">+{a.xp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {skyrimasPaleistas && (
        <Alert variant="success">
          <AlertDescription>
            <div className="mb-2 flex items-center gap-1.5 font-medium"><Sparkles className="h-4 w-4" /> Suteikti nauji apdovanojimai (3):</div>
            <ul className="list-inside list-disc">
              <li>Eglė Kairytė – „Testų meistras“ (+200 XP)</li>
              <li>Jonas Petraitis – „Savaitės serija“ (+150 XP)</li>
              <li>Ieva Mažeikė – „Kurso baigėjas“ (+500 XP)</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </Page>
  );
}
