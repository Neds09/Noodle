// Testo forma (naudojama Testo kūrimo ir Testo redagavimo languose).
// Uždarojo tipo klausimo variantai įvedami po vieną eilutėje.

import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Field } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { UZSIEMIMAI, type Testas } from "@/data/duomenys";

interface KlausimoForma {
  tekstas: string;
  tipas: string; // „Uždaras“ arba „Atviras“
  balas: number;
  variantai: string; // kiekvienas variantas atskiroje eilutėje
  teisingasVariantas: number; // varianto numeris nuo 1
  etaloninisAtsakymas: string; // atvirojo tipo klausimams
}

function tuscias(): KlausimoForma {
  return { tekstas: "", tipas: "Uždaras", balas: 1, variantai: "", teisingasVariantas: 1, etaloninisAtsakymas: "" };
}

interface Props {
  testas?: Testas; // jei perduotas – redaguojamas esamas testas
  uzrakinta?: boolean; // true – redaguoti negalima
  issaugoti: (klausimuSkaicius: number) => void;
}

export function TestoForma({ testas, uzrakinta = false, issaugoti }: Props) {
  // Pradiniai klausimai: esamo testo klausimai arba tuščias sąrašas
  const pradiniai: KlausimoForma[] = (testas?.klausimai ?? []).map((k) => ({
    tekstas: k.tekstas,
    tipas: k.tipas,
    balas: k.balas,
    variantai: k.variantai.join("\n"),
    teisingasVariantas: k.teisingasVariantas,
    etaloninisAtsakymas: "",
  }));
  const [klausimai, setKlausimai] = useState<KlausimoForma[]>(pradiniai);

  function pakeistiKlausima(nr: number, pakeitimai: Partial<KlausimoForma>) {
    const nauji = [...klausimai];
    nauji[nr] = { ...nauji[nr], ...pakeitimai };
    setKlausimai(nauji);
  }

  function pridetiKlausima() {
    setKlausimai([...klausimai, tuscias()]);
  }

  function pasalintiKlausima(nr: number) {
    setKlausimai(klausimai.filter((_, i) => i !== nr));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Testo nustatymai</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <Field label="Pavadinimas"><Input defaultValue={testas?.pavadinimas} disabled={uzrakinta} /></Field>
          </div>
          <Field label="Laiko limitas (min.)"><Input type="number" defaultValue={testas?.laikoLimitasMin ?? 20} disabled={uzrakinta} /></Field>
          <Field label="Leidžiamų bandymų skaičius"><Input type="number" defaultValue={testas?.bandymuSkaicius ?? 1} disabled={uzrakinta} /></Field>
          <Field label="Užsiėmimas">
            <Select disabled={uzrakinta}>
              {UZSIEMIMAI.map((u) => <option key={u.id}>{u.pavadinimas}</option>)}
            </Select>
          </Field>
        </CardContent>
      </Card>

      {klausimai.map((k, nr) => (
        <Card key={nr}>
          <CardContent className="grid gap-3 pt-5 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Field label={`${nr + 1} klausimas`}>
                <Input value={k.tekstas} disabled={uzrakinta} onChange={(e) => pakeistiKlausima(nr, { tekstas: e.target.value })} />
              </Field>
            </div>
            <Field label="Tipas">
              <Select value={k.tipas} disabled={uzrakinta} onChange={(e) => pakeistiKlausima(nr, { tipas: e.target.value })}>
                <option>Uždaras</option>
                <option>Atviras</option>
              </Select>
            </Field>
            <Field label="Balas">
              <Input type="number" value={k.balas} disabled={uzrakinta} onChange={(e) => pakeistiKlausima(nr, { balas: Number(e.target.value) })} />
            </Field>

            {k.tipas === "Uždaras" && (
              <>
                <div className="sm:col-span-5">
                  <Field label="Atsakymo variantai (po vieną eilutėje)">
                    <Textarea rows={5} value={k.variantai} disabled={uzrakinta} onChange={(e) => pakeistiKlausima(nr, { variantai: e.target.value })} />
                  </Field>
                </div>
                <Field label="Teisingo varianto Nr.">
                  <Input type="number" min={1} value={k.teisingasVariantas} disabled={uzrakinta}
                    onChange={(e) => pakeistiKlausima(nr, { teisingasVariantas: Number(e.target.value) })} />
                </Field>
              </>
            )}

            {k.tipas === "Atviras" && (
              <div className="sm:col-span-6">
                <Field label="Teisingas (etaloninis) atsakymas" hint="Naudojamas DI vertinant atvirojo tipo atsakymus.">
                  <Textarea value={k.etaloninisAtsakymas} disabled={uzrakinta}
                    onChange={(e) => pakeistiKlausima(nr, { etaloninisAtsakymas: e.target.value })} />
                </Field>
              </div>
            )}

            {!uzrakinta && (
              <div className="sm:col-span-6">
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => pasalintiKlausima(nr)}>
                  <Trash2 /> Pašalinti klausimą
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {!uzrakinta && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={pridetiKlausima}><Plus /> Pridėti klausimą</Button>
          <Button onClick={() => issaugoti(klausimai.length)}><Save /> Išsaugoti testą</Button>
        </div>
      )}
    </div>
  );
}
