// Langas: Kurso aprašo langas
// Panaudojimo atvejai: Peržiūrėti kursą, Rekomenduoti kursą, Patvirtinti kursą
// Navigacija: → Kurso užsiėmimų sąrašo langas (užsiregistravusiam)
// Administratorius čia patvirtina kursą arba grąžina jį taisyti.

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, CheckCircle2, Plus, RotateCcw } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRole } from "@/lib/role";
import { UZSIEMIMAI, rastiKursa } from "@/data/duomenys";
import { KursoBusena } from "./KursoKortele";

export function KursoAprasoLangas() {
  const { id } = useParams();
  const kursas = rastiKursa(id);
  const { role } = useRole();

  const [busena, setBusena] = useState(kursas.busena);
  const [uzsiregistraves, setUzsiregistraves] = useState(kursas.id === 1);

  const adminTvirtina = role === "Administratorius" && busena === "Laukia patvirtinimo";

  return (
    <Page langas="Kurso aprašo langas" title={kursas.pavadinimas} subtitle={kursas.aprasas}>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-base">Apie kursą</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <div><div className="text-muted-foreground">Kategorija</div>{kursas.kategorija}</div>
            <div><div className="text-muted-foreground">Sudėtingumas</div>{kursas.sudetingumas}</div>
            <div><div className="text-muted-foreground">Dėstytojas</div>{kursas.destytojas}</div>
            <div><div className="text-muted-foreground">Reikalavimai</div>{kursas.reikalavimai}</div>
            <div className="sm:col-span-2">
              <div className="mb-1 text-muted-foreground">Užsiėmimai</div>
              <ul className="list-inside list-disc">
                {UZSIEMIMAI.map((u) => <li key={u.id}>{u.pavadinimas}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Būsena</CardTitle>
            <div><KursoBusena busena={busena} /></div>
          </CardHeader>
          <CardContent className="space-y-2">
            {adminTvirtina && (
              <>
                <Button className="w-full" onClick={() => setBusena("Paskelbtas")}><CheckCircle2 /> Patvirtinti kursą</Button>
                <Button className="w-full" variant="outline" onClick={() => setBusena("Grąžintas taisyti")}><RotateCcw /> Grąžinti taisyti</Button>
              </>
            )}

            {!adminTvirtina && role === "Svečias" && (
              <p className="text-sm text-muted-foreground">Norėdami registruotis į kursą, prisijunkite.</p>
            )}

            {!adminTvirtina && role !== "Svečias" && uzsiregistraves && (
              <Button className="w-full" asChild>
                <Link to={`/kursai/${kursas.id}/uzsiemimai`}><BookOpen /> Atidaryti užsiėmimus</Link>
              </Button>
            )}

            {!adminTvirtina && role !== "Svečias" && !uzsiregistraves && (
              <Button className="w-full" disabled={busena !== "Paskelbtas"} onClick={() => setUzsiregistraves(true)}>
                <Plus /> Užsiregistruoti
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
