// Kurso kortelė kursų sąraše ir rekomendacijose. Paspaudus atidaromas Kurso aprašo langas.

import { Link } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Kursas } from "@/data/duomenys";

export function KursoKortele({ kursas, papildomaInfo }: { kursas: Kursas; papildomaInfo?: string }) {
  return (
    <Link to={`/kursai/${kursas.id}`} className="group">
      <Card className="flex h-full flex-col transition group-hover:border-primary/40 group-hover:shadow-md">
        <CardHeader>
          <div className="flex gap-1.5">
            <Badge variant="secondary">{kursas.kategorija}</Badge>
            <Badge variant="outline">{kursas.sudetingumas}</Badge>
          </div>
          <CardTitle className="pt-1 text-base">{kursas.pavadinimas}</CardTitle>
          <CardDescription>{kursas.aprasas}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto justify-between text-xs text-muted-foreground">
          <span>{kursas.destytojas}</span>
          {papildomaInfo ? <span className="font-medium text-primary">{papildomaInfo}</span> : <span>{kursas.dalyviai} dalyv.</span>}
        </CardFooter>
      </Card>
    </Link>
  );
}

// Spalvota kurso būsenos žymė
export function KursoBusena({ busena }: { busena: string }) {
  if (busena === "Paskelbtas") return <Badge variant="success">{busena}</Badge>;
  if (busena === "Laukia patvirtinimo") return <Badge variant="warning">{busena}</Badge>;
  return <Badge variant="destructive">{busena}</Badge>;
}
