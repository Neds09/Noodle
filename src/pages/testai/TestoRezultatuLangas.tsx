// Langas: Testo rezultatų langas
// Panaudojimo atvejai: Peržiūrėti testo įvertinimą, Spręsti testą
// Navigacija: išeinančių jungčių nėra

import { useParams } from "react-router-dom";
import { Bot, CheckCircle2, XCircle } from "lucide-react";
import { Page } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { rastiTesta } from "@/data/duomenys";

const DI_PAAISKINIMAS =
  "Atsakymas teisingai apibūdina kintamąjį kaip pavadintą reikšmės saugojimo vietą, " +
  "tačiau trūksta pavyzdžio ir paminėjimo, kad reikšmė gali keistis.";

export function TestoRezultatuLangas() {
  const { testId } = useParams();
  const testas = rastiTesta(testId);

  // Demonstraciniai rezultatai: 2-as klausimas atsakytas neteisingai,
  // atvirieji klausimai DI įvertinti 2/3 maksimalaus balo
  const rezultatai = testas.klausimai.map((k, nr) => {
    let gautaBalu = k.balas;
    if (k.tipas === "Uždaras" && nr === 1) gautaBalu = 0;
    if (k.tipas === "Atviras") gautaBalu = Math.round(k.balas * 0.67);
    return { klausimas: k, gautaBalu };
  });

  const surinkta = rezultatai.reduce((suma, r) => suma + r.gautaBalu, 0);
  const maksimalu = testas.klausimai.reduce((suma, k) => suma + k.balas, 0);

  return (
    <Page langas="Testo rezultatų langas" title={`Rezultatai: ${testas.pavadinimas}`}>
      <Card>
        <CardContent className="flex flex-wrap items-center gap-6 pt-5">
          <div>
            <div className="text-sm text-muted-foreground">Bendras balas</div>
            <div className="text-3xl font-semibold">{surinkta} / {maksimalu}</div>
          </div>
          <div className="min-w-48 flex-1"><Progress value={(surinkta / maksimalu) * 100} /></div>
          <Badge variant="success">Bandymas baigtas</Badge>
        </CardContent>
      </Card>

      {rezultatai.map(({ klausimas, gautaBalu }, nr) => {
        const teisingai = gautaBalu === klausimas.balas;
        return (
          <Card key={klausimas.id}>
            <CardContent className="space-y-2 pt-5 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  {teisingai
                    ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />}
                  <b>{nr + 1}. {klausimas.tekstas}</b>
                </div>
                <Badge variant="outline">{gautaBalu} / {klausimas.balas}</Badge>
              </div>
              {klausimas.tipas === "Atviras" && (
                <div className="flex gap-2 rounded-md bg-sky-50 p-3 text-sky-900">
                  <Bot className="h-4 w-4 shrink-0" />
                  <div><b>DI paaiškinimas: </b>{DI_PAAISKINIMAS}</div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Page>
  );
}
