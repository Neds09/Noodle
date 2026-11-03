// Langas: Sertifikato išdavimo langas
// Panaudojimo atvejis: Išduoti sertifikatą
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { FileBadge } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KURSAI, NAUDOTOJAI } from "@/data/duomenys";

export function SertifikatoIsdavimoLangas() {
  const studentai = NAUDOTOJAI.filter((n) => n.role === "Studentas");
  const kursai = KURSAI.filter((k) => k.busena === "Paskelbtas");

  const [studentas, setStudentas] = useState(studentai[0].vardas);
  const [kursas, setKursas] = useState(kursai[0].pavadinimas);
  const [klaida, setKlaida] = useState("");
  const [sekme, setSekme] = useState("");

  function isduoti() {
    setKlaida("");
    setSekme("");
    // Demonstraciniai atvejai pagal sekų diagramą
    if (studentas === "Eglė Kairytė" && kursas === kursai[0].pavadinimas) {
      setKlaida("Šiam studentui sertifikatas už šį kursą jau išduotas.");
    } else if (studentas === "Mantas Bružas") {
      setKlaida("Neįvykdyti kurso reikalavimai: baigta 64 % užsiėmimų, neįvertinta 1 užduotis.");
    } else {
      setSekme("Sertifikatas išduotas (kodas NDL-2026-0101). PDF su QR kodu išsiųstas studentui.");
    }
  }

  return (
    <Page langas="Sertifikato išdavimo langas" title="Išduoti sertifikatą">
      <Card className="max-w-xl">
        <CardHeader>
          <CardDescription>Sistema patikrins kurso reikalavimus ir ar sertifikatas dar neišduotas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Studentas">
            <Select value={studentas} onChange={(e) => setStudentas(e.target.value)}>
              {studentai.map((s) => <option key={s.id}>{s.vardas}</option>)}
            </Select>
          </Field>
          <Field label="Kursas">
            <Select value={kursas} onChange={(e) => setKursas(e.target.value)}>
              {kursai.map((k) => <option key={k.id}>{k.pavadinimas}</option>)}
            </Select>
          </Field>
          <Button onClick={isduoti}><FileBadge /> Išduoti</Button>
          {klaida && <Alert variant="destructive"><AlertDescription>{klaida}</AlertDescription></Alert>}
          {sekme && <Alert variant="success"><AlertDescription>{sekme}</AlertDescription></Alert>}
        </CardContent>
      </Card>
    </Page>
  );
}
