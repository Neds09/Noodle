// Langas: Sprendimo vertinimo langas
// Panaudojimo atvejis: Įvertinti užduotį (su DI pagalba arba rankiniu būdu)
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Bot, Loader2, Send } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SPRENDIMAI, rastiUzduoti } from "@/data/duomenys";

const SPRENDIMO_KODAS = `a = float(input("a = "))
b = float(input("b = "))
print("Suma:", a + b)
print("Skirtumas:", a - b)
print("Sandauga:", a * b)
print("Dalmuo:", a / b)`;

export function SprendimoVertinimoLangas() {
  const { taskId, sid } = useParams();
  const uzduotis = rastiUzduoti(taskId);
  const sprendimas = SPRENDIMAI.find((s) => String(s.id) === sid) ?? SPRENDIMAI[0];

  const [budas, setBudas] = useState<"DI" | "Rankinis">("DI");
  const [kraunasi, setKraunasi] = useState(false);
  const [imituotiDiKlaida, setImituotiDiKlaida] = useState(false);
  const [diNepasiekiamas, setDiNepasiekiamas] = useState(false);
  const [balas, setBalas] = useState("");
  const [komentaras, setKomentaras] = useState("");
  const [rezultatas, setRezultatas] = useState<"" | "issaugota" | "klaida">("");

  // Imituojamas kreipimasis į DI API (tikroje sistemoje – Gemini API)
  function gautiDiPasiulyma() {
    setKraunasi(true);
    setDiNepasiekiamas(false);
    setTimeout(() => {
      setKraunasi(false);
      if (imituotiDiKlaida) {
        setDiNepasiekiamas(true);
        return;
      }
      setBalas("8");
      setKomentaras("Programa veikia su visomis keturiomis operacijomis, tačiau neapdorota dalyba iš nulio. Kodas tvarkingas.");
    }, 900);
  }

  function patvirtinti() {
    const skaicius = Number(balas);
    const balasTeisingas = balas !== "" && skaicius >= 0 && skaicius <= uzduotis.maksimalusBalas;
    setRezultatas(balasTeisingas ? "issaugota" : "klaida");
  }

  return (
    <Page
      langas="Sprendimo vertinimo langas"
      title={`Vertinti: ${sprendimas.studentas}`}
      subtitle={`${uzduotis.pavadinimas} · pateikta ${sprendimas.pateikta}`}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sprendimas <span className="font-mono text-xs text-muted-foreground">{sprendimas.failas}</span></CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">{SPRENDIMO_KODAS}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Vertinimas</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Vertinimo būdas">
              <div className="flex gap-2">
                <Button size="sm" variant={budas === "DI" ? "default" : "outline"} onClick={() => setBudas("DI")}><Bot /> Su DI pagalba</Button>
                <Button size="sm" variant={budas === "Rankinis" ? "default" : "outline"} onClick={() => setBudas("Rankinis")}>Rankinis</Button>
              </div>
            </Field>

            {budas === "DI" && (
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={gautiDiPasiulyma} disabled={kraunasi}>
                  {kraunasi ? <Loader2 className="animate-spin" /> : <Bot />} Gauti DI pasiūlymą
                </Button>
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <input type="checkbox" checked={imituotiDiKlaida} onChange={(e) => setImituotiDiKlaida(e.target.checked)} />
                  imituoti DI nepasiekiamumą
                </label>
              </div>
            )}
            {diNepasiekiamas && <Alert variant="destructive"><AlertDescription>DI nepasiekiamas – įvertinkite rankiniu būdu.</AlertDescription></Alert>}

            <Field label={`Balas (0–${uzduotis.maksimalusBalas})`}>
              <Input type="number" value={balas} onChange={(e) => setBalas(e.target.value)} />
            </Field>
            <Field label="Komentaras">
              <Textarea value={komentaras} onChange={(e) => setKomentaras(e.target.value)} />
            </Field>
            <Button onClick={patvirtinti}><Send /> Patvirtinti įvertinimą</Button>

            {rezultatas === "issaugota" && <Alert variant="success"><AlertDescription>Įvertinimas išsaugotas, sprendimo būsena – „Įvertinta“.</AlertDescription></Alert>}
            {rezultatas === "klaida" && <Alert variant="destructive"><AlertDescription>Balas turi būti nuo 0 iki {uzduotis.maksimalusBalas}.</AlertDescription></Alert>}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
