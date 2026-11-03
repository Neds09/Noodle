// Langas: Testo langas (testo sprendimas)
// Panaudojimo atvejis: Spręsti testą
// Navigacija: → Testo rezultatų langas (pateikus atsakymus)

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Send } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { rastiTesta } from "@/data/duomenys";

export function TestoLangas() {
  const { id, testId } = useParams();
  const testas = rastiTesta(testId);
  const navigate = useNavigate();

  const [likoSekundziu, setLikoSekundziu] = useState(testas.laikoLimitasMin * 60);
  const [atsakymai, setAtsakymai] = useState<Record<number, string>>({});

  // Laikmatis: kas sekundę sumažina likusį laiką
  useEffect(() => {
    const laikmatis = setInterval(() => {
      setLikoSekundziu((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(laikmatis);
  }, []);

  const minutes = String(Math.floor(likoSekundziu / 60)).padStart(2, "0");
  const sekundes = String(likoSekundziu % 60).padStart(2, "0");
  const atsakytaProcentu = (Object.keys(atsakymai).length / testas.klausimai.length) * 100;

  function atsakyti(klausimoId: number, atsakymas: string) {
    setAtsakymai({ ...atsakymai, [klausimoId]: atsakymas });
  }

  function pateikti() {
    // Tikroje sistemoje čia atsakymai būtų išsiųsti vertinti (uždarieji – automatiškai, atvirieji – DI)
    navigate(`/kursai/${id}/testai/${testas.id}/rezultatai`);
  }

  return (
    <Page
      langas="Testo langas"
      title={testas.pavadinimas}
      subtitle={`Bandymas 1 iš ${testas.bandymuSkaicius}`}
      actions={
        <Badge variant={likoSekundziu < 60 ? "destructive" : "secondary"} className="gap-1.5 px-3 py-1.5 text-sm">
          <Clock className="h-4 w-4" /> {minutes}:{sekundes}
        </Badge>
      }
    >
      <Progress value={atsakytaProcentu} />

      {testas.klausimai.map((k, nr) => (
        <Card key={k.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between gap-2">
              <CardTitle className="text-base">{nr + 1}. {k.tekstas}</CardTitle>
              <Badge variant="outline">{k.balas} t.</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {k.tipas === "Uždaras" ? (
              <div className="space-y-2">
                {k.variantai.map((variantas) => (
                  <label key={variantas} className="flex cursor-pointer items-center gap-2 rounded-md border p-2.5 text-sm hover:bg-accent">
                    <input type="radio" name={`klausimas-${k.id}`} onChange={() => atsakyti(k.id, variantas)} /> {variantas}
                  </label>
                ))}
              </div>
            ) : (
              <Textarea placeholder="Jūsų atsakymas..." onChange={(e) => atsakyti(k.id, e.target.value)} />
            )}
          </CardContent>
        </Card>
      ))}

      <Button size="lg" onClick={pateikti}><Send /> Pateikti atsakymus</Button>
    </Page>
  );
}
