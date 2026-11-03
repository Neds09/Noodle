// Langas: Kurso užsiėmimų sąrašo langas
// Tai testų ir užduočių „centras“: studentas čia patenka per Kurso aprašo langą, dėstytojas – per Mano kursų sąrašą.
// Panaudojimo atvejai: Įkelti mokomąją medžiagą, Sukurti / Redaguoti / Šalinti / Spręsti testą, Peržiūrėti testo įvertinimą,
//                      Sukurti / Redaguoti / Šalinti / Pateikti / Įvertinti užduotį
// Navigacija: → Medžiagos įkėlimo, Testo kūrimo, Testo redagavimo, Testo, Testo rezultatų, Užduoties, Užduoties kūrimo,
//               Užduoties redagavimo, Pateiktų sprendimų sąrašo langai, → Šalinimo patvirtinimo langas (dialogas)

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipboardList, Eye, FileText, FlaskConical, Pencil, Trash2, Upload, Users } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SalinimoPatvirtinimoLangas } from "@/pages/bendri/SalinimoPatvirtinimoLangas";
import { turiTeises, useRole } from "@/lib/role";
import { UZSIEMIMAI, rastiKursa, rastiTesta, rastiUzduoti } from "@/data/duomenys";

interface Salinimas {
  pavadinimas: string;
  ispejimas?: string;
  galima: boolean;
}

export function KursoUzsiemimuSarasoLangas() {
  const { id } = useParams();
  const kursas = rastiKursa(id);
  const { role } = useRole();

  const yraStudentas = role === "Studentas";
  const yraDestytojas = turiTeises(role, "Dėstytojas");
  const kelias = `/kursai/${kursas.id}`; // visų nuorodų pradžia

  const [salinimas, setSalinimas] = useState<Salinimas | null>(null);
  const [pranesimas, setPranesimas] = useState("");

  function salintiTesta(pavadinimas: string) {
    setSalinimas({ pavadinimas: `testas „${pavadinimas}“`, ispejimas: "Jau surinkti testo rezultatai bus archyvuoti.", galima: true });
  }

  function salintiUzduoti(pavadinimas: string, uzduotiesId: number) {
    // Demonstracijai: 1-ai užduočiai jau pateikta sprendimų, todėl jos šalinti negalima
    if (uzduotiesId === 1) {
      setSalinimas({ pavadinimas: `užduotis „${pavadinimas}“`, ispejimas: "Užduočiai jau pateikta sprendimų – jos pašalinti negalima.", galima: false });
    } else {
      setSalinimas({ pavadinimas: `užduotis „${pavadinimas}“`, galima: true });
    }
  }

  function patvirtintiSalinima() {
    if (!salinimas) return;
    if (salinimas.galima) {
      setPranesimas(`Pašalinta: ${salinimas.pavadinimas}.`);
    } else {
      setPranesimas("Šalinimas atmestas: yra pateiktų sprendimų.");
    }
  }

  const destytojoMygtukai = (
    <>
      <Button variant="outline" asChild><Link to={`${kelias}/medziaga`}><Upload /> Įkelti medžiagą</Link></Button>
      <Button variant="outline" asChild><Link to={`${kelias}/testai/naujas`}><FlaskConical /> Sukurti testą</Link></Button>
      <Button asChild><Link to={`${kelias}/uzduotys/nauja`}><ClipboardList /> Sukurti užduotį</Link></Button>
    </>
  );

  return (
    <Page
      langas="Kurso užsiėmimų sąrašo langas"
      title={kursas.pavadinimas}
      subtitle="Užsiėmimai, mokomoji medžiaga, testai ir užduotys."
      actions={yraDestytojas && destytojoMygtukai}
    >
      {pranesimas && <Alert variant="success"><AlertDescription>{pranesimas}</AlertDescription></Alert>}
      {role === "Svečias" && (
        <Alert variant="info"><AlertDescription>Užsiėmimai prieinami tik užsiregistravusiems studentams.</AlertDescription></Alert>
      )}

      {UZSIEMIMAI.map((uzsiemimas) => (
        <Card key={uzsiemimas.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{uzsiemimas.pavadinimas}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {/* Mokomoji medžiaga */}
            <div className="flex flex-wrap gap-2">
              {uzsiemimas.medziaga.map((failas) => (
                <span key={failas} className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1">
                  <FileText className="h-3.5 w-3.5" /> {failas}
                </span>
              ))}
            </div>

            {/* Testai */}
            {uzsiemimas.testuId.map((testoId) => {
              const testas = rastiTesta(String(testoId));
              return (
                <div key={testoId} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    <b>{testas.pavadinimas}</b>
                    <span className="text-muted-foreground">· {testas.klausimai.length} kl. · {testas.laikoLimitasMin} min</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {yraStudentas && (
                      <Button size="sm" asChild><Link to={`${kelias}/testai/${testoId}`}>Spręsti testą</Link></Button>
                    )}
                    {role !== "Svečias" && (
                      <Button size="sm" variant="outline" asChild><Link to={`${kelias}/testai/${testoId}/rezultatai`}><Eye /> Rezultatai</Link></Button>
                    )}
                    {yraDestytojas && (
                      <>
                        <Button size="sm" variant="outline" asChild><Link to={`${kelias}/testai/${testoId}/redaguoti`}><Pencil /> Redaguoti</Link></Button>
                        <Button size="sm" variant="outline" onClick={() => salintiTesta(testas.pavadinimas)}><Trash2 /> Šalinti</Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Užduotys */}
            {uzsiemimas.uzduocuId.map((uzduotiesId) => {
              const uzduotis = rastiUzduoti(String(uzduotiesId));
              return (
                <div key={uzduotiesId} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    <b>{uzduotis.pavadinimas}</b>
                    <span className="text-muted-foreground">· terminas {uzduotis.terminas}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {yraStudentas && (
                      <Button size="sm" asChild><Link to={`${kelias}/uzduotys/${uzduotiesId}`}>Atidaryti užduotį</Link></Button>
                    )}
                    {yraDestytojas && (
                      <>
                        <Button size="sm" variant="outline" asChild><Link to={`${kelias}/uzduotys/${uzduotiesId}/sprendimai`}><Users /> Sprendimai</Link></Button>
                        <Button size="sm" variant="outline" asChild><Link to={`${kelias}/uzduotys/${uzduotiesId}/redaguoti`}><Pencil /> Redaguoti</Link></Button>
                        <Button size="sm" variant="outline" onClick={() => salintiUzduoti(uzduotis.pavadinimas, uzduotiesId)}><Trash2 /> Šalinti</Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <SalinimoPatvirtinimoLangas
        atidarytas={salinimas !== null}
        uzdaryti={() => setSalinimas(null)}
        kaSalinama={salinimas?.pavadinimas ?? ""}
        ispejimas={salinimas?.ispejimas}
        patvirtinti={patvirtintiSalinima}
      />
    </Page>
  );
}
