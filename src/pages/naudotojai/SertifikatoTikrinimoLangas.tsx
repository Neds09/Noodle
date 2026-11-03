// Langas: Sertifikato tikrinimo langas
// Panaudojimo atvejis: Patikrinti sertifikatą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { QrCode, Search } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DEMO_SERTIFIKATAS } from "@/data/duomenys";

export function SertifikatoTikrinimoLangas() {
  const [kodas, setKodas] = useState("");
  const [rezultatas, setRezultatas] = useState<"" | "rastas" | "nerastas">("");
  const s = DEMO_SERTIFIKATAS;

  function tikrinti() {
    if (kodas.trim() === s.kodas) {
      setRezultatas("rastas");
    } else {
      setRezultatas("nerastas");
    }
  }

  return (
    <Page langas="Sertifikato tikrinimo langas" title="Sertifikato patikra" subtitle="Įveskite kodą arba nuskenuokite QR kodą nuo sertifikato.">
      <Card className="max-w-xl">
        <CardContent className="space-y-4 pt-5">
          <Field label="Sertifikato kodas" hint={`Demonstracinis galiojantis kodas: ${s.kodas}`}>
            <div className="flex gap-2">
              <Input value={kodas} onChange={(e) => setKodas(e.target.value.toUpperCase())} placeholder="NDL-2026-0000" />
              <Button variant="outline" size="icon" title="Skenuoti QR"><QrCode /></Button>
            </div>
          </Field>
          <Button onClick={tikrinti}><Search /> Tikrinti</Button>

          {rezultatas === "rastas" && (
            <Alert variant="success">
              <AlertTitle>Sertifikatas galioja</AlertTitle>
              <AlertDescription>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <span>Savininkas:</span><b>{s.savininkas}</b>
                  <span>Kursas:</span><b>{s.kursas}</b>
                  <span>Išdavimo data:</span><b>{s.data}</b>
                  <span>Galutinis pažymys:</span><b>{s.pazymys}</b>
                </div>
              </AlertDescription>
            </Alert>
          )}
          {rezultatas === "nerastas" && (
            <Alert variant="destructive">
              <AlertDescription>Sertifikatas su tokiu kodu nerastas – jis negaliojantis.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Page>
  );
}
