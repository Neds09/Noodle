// Langas: Medžiagos įkėlimo langas
// Panaudojimo atvejis: Įkelti mokomąją medžiagą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { Upload } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UZSIEMIMAI } from "@/data/duomenys";

const LEIDZIAMI_FORMATAI = [".pdf", ".pptx", ".docx", ".mp4"];

export function MedziagosIkelimoLangas() {
  const [uzsiemimas, setUzsiemimas] = useState("1");
  const [failas, setFailas] = useState<File | null>(null);
  const [rezultatas, setRezultatas] = useState<"" | "ikelta" | "netinkama">("");

  function ikelti() {
    const tinkamasFailas = failas !== null && LEIDZIAMI_FORMATAI.some((f) => failas.name.toLowerCase().endsWith(f));
    setRezultatas(tinkamasFailas ? "ikelta" : "netinkama");
  }

  return (
    <Page langas="Medžiagos įkėlimo langas" title="Įkelti mokomąją medžiagą">
      <Card className="max-w-xl">
        <CardContent className="space-y-4 pt-5">
          <Field label="Užsiėmimas">
            <Select value={uzsiemimas} onChange={(e) => setUzsiemimas(e.target.value)}>
              {UZSIEMIMAI.map((u) => <option key={u.id} value={u.id}>{u.pavadinimas}</option>)}
              <option value="naujas">+ Naujas užsiėmimas</option>
            </Select>
          </Field>
          {uzsiemimas === "naujas" && (
            <Field label="Naujo užsiėmimo pavadinimas"><Input placeholder="4. Funkcijos" /></Field>
          )}
          <Field label="Failas" hint="Leidžiama: PDF, PPTX, DOCX, MP4 (iki 200 MB)">
            <Input type="file" onChange={(e) => setFailas(e.target.files?.[0] ?? null)} />
          </Field>
          <Button onClick={ikelti}><Upload /> Įkelti</Button>
          {rezultatas === "ikelta" && <Alert variant="success"><AlertDescription>Medžiaga sėkmingai įkelta į užsiėmimą.</AlertDescription></Alert>}
          {rezultatas === "netinkama" && <Alert variant="destructive"><AlertDescription>Medžiaga netinkama: pasirinkite leidžiamo formato failą.</AlertDescription></Alert>}
        </CardContent>
      </Card>
    </Page>
  );
}
