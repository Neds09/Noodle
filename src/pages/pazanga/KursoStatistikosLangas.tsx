// Langas: Kurso statistikos langas
// Panaudojimo atvejis: Peržiūrėti kurso statistiką
// Navigacija: išeinančių jungčių nėra

import { useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rastiKursa } from "@/data/duomenys";
import { ProcentuEilute, Rodiklis } from "./Rodiklis";

export function KursoStatistikosLangas() {
  const { id } = useParams();
  const kursas = rastiKursa(id);

  return (
    <Page langas="Kurso statistikos langas" title={`Statistika: ${kursas.pavadinimas}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Rodiklis pavadinimas="Registracijos" reiksme={String(kursas.dalyviai)} paaiskinimas="+18 per mėnesį" />
        <Rodiklis pavadinimas="Baigimo vidurkis" reiksme="68 %" />
        <Rodiklis pavadinimas="Testų vidurkis" reiksme="74 %" />
        <Rodiklis pavadinimas="Baigė kursą" reiksme="41" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sunkiausios užduotys ir klausimai</CardTitle>
          <CardDescription>Vidutinis teisingų atsakymų / balų procentas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ProcentuEilute pavadinimas="Testas „Duomenų tipų testas“ – 2 klausimas" procentai={38} />
          <ProcentuEilute pavadinimas="Užduotis „Daugybos lentelė“" procentai={52} />
          <ProcentuEilute pavadinimas="Testas „Įvado testas“ – 3 klausimas" procentai={61} />
        </CardContent>
      </Card>
    </Page>
  );
}
