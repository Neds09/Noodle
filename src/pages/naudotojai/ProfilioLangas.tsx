// Langas: Profilio langas
// Panaudojimo atvejai: Peržiūrėti profilį, Redaguoti profilį
// Navigacija: → Profilio redagavimo langas

import { useState } from "react";
import { Link } from "react-router-dom";
import { FileBadge, Pencil } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProfilioLangas() {
  // Kai žiūrima kaip kitas naudotojas, el. paštas ir telefonas paslepiami
  const [kitoNaudotojoVaizdas, setKitoNaudotojoVaizdas] = useState(false);
  const elPastas = kitoNaudotojoVaizdas ? "paslėpta" : "jonas@noodle.lt";
  const telefonas = kitoNaudotojoVaizdas ? "paslėpta" : "+370 600 12345";

  return (
    <Page
      langas="Profilio langas"
      title="Profilis"
      actions={!kitoNaudotojoVaizdas && (
        <Button asChild>
          <Link to="/profilis/redaguoti"><Pencil /> Redaguoti profilį</Link>
        </Button>
      )}
    >
      <label className="flex w-fit items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={kitoNaudotojoVaizdas} onChange={(e) => setKitoNaudotojoVaizdas(e.target.checked)} />
        Rodyti taip, kaip mato kitas naudotojas
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-primary/15 text-3xl font-semibold text-primary">JP</div>
            <div>
              <div className="text-lg font-semibold">Jonas Petraitis</div>
              <div className="text-sm text-muted-foreground">Studentas · nuo 2026-09-02</div>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <Badge variant="secondary">IT</Badge>
              <Badge variant="secondary">Kalbos</Badge>
              <Badge variant="secondary">Muzika</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-base">Informacija</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <div><div className="text-muted-foreground">El. paštas</div>{elPastas}</div>
            <div><div className="text-muted-foreground">Telefonas</div>{telefonas}</div>
            <div className="sm:col-span-2">
              <div className="text-muted-foreground">Apie mane</div>
              Informatikos studentas, domiuosi programavimu ir muzika.
            </div>
            <div className="sm:col-span-2">
              <div className="text-muted-foreground">Sertifikatai</div>
              <div className="flex items-center gap-2">
                <FileBadge className="h-4 w-4 text-primary" /> Programavimo pagrindai su Python · NDL-2026-0017
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
