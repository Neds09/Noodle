// Langas: Užduoties langas
// Panaudojimo atvejis: Pateikti užduotį
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { rastiUzduoti } from "@/data/duomenys";

const LEIDZIAMI_FORMATAI = [".py", ".zip", ".pdf"];

export function UzduotiesLangas() {
  const { taskId } = useParams();
  const uzduotis = rastiUzduoti(taskId);

  const [failas, setFailas] = useState<File | null>(null);
  const [tekstas, setTekstas] = useState("");
  const [rezultatas, setRezultatas] = useState<"" | "pateikta" | "klaida">("");

  function pateikti() {
    let tinkama = false;
    if (failas) {
      tinkama = LEIDZIAMI_FORMATAI.some((f) => failas.name.toLowerCase().endsWith(f));
    } else {
      tinkama = tekstas.trim() !== "";
    }
    setRezultatas(tinkama ? "pateikta" : "klaida");
  }

  return (
    <Page
      langas="Užduoties langas"
      title={uzduotis.pavadinimas}
      subtitle={`Terminas: ${uzduotis.terminas} · Maksimalus balas: ${uzduotis.maksimalusBalas}`}
    >
      <Card><CardContent className="pt-5 text-sm">{uzduotis.aprasymas}</CardContent></Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">Pateikti sprendimą</CardTitle>
          <CardDescription>Įkelkite failą (.py, .zip, .pdf iki 20 MB) arba įrašykite sprendimą tekstu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Sprendimo failas">
            <Input type="file" onChange={(e) => setFailas(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label="arba tekstas">
            <Textarea value={tekstas} onChange={(e) => setTekstas(e.target.value)} className="font-mono text-xs" />
          </Field>
          <Button onClick={pateikti}><Upload /> Pateikti</Button>
          {rezultatas === "pateikta" && <Alert variant="success"><AlertDescription>Sprendimas pateiktas (būsena „pateikta“).</AlertDescription></Alert>}
          {rezultatas === "klaida" && <Alert variant="destructive"><AlertDescription>Netinkamas failo formatas arba tuščias sprendimas.</AlertDescription></Alert>}
        </CardContent>
      </Card>
    </Page>
  );
}
