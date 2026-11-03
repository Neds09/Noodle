// Langas: Rekomenduojamų kursų langas
// Panaudojimo atvejis: Rekomenduoti kursą
// Navigacija: → Kurso aprašo langas

import { Page } from "@/components/Layout";
import { KURSAI } from "@/data/duomenys";
import { KursoKortele } from "./KursoKortele";

// Prototipe rekomendacijos surašytos ranka (tikroje sistemoje jas skaičiuotų algoritmas)
const REKOMENDACIJOS = [
  { kursas: KURSAI[1], atitiktis: "92 % atitiktis" },
  { kursas: KURSAI[4], atitiktis: "81 % atitiktis" },
  { kursas: KURSAI[2], atitiktis: "57 % atitiktis" },
];

export function RekomenduojamuKursuLangas() {
  return (
    <Page
      langas="Rekomenduojamų kursų langas"
      title="Rekomenduojami kursai"
      subtitle="Sudaryta pagal jūsų pomėgius (IT, Kalbos, Muzika), baigtus kursus ir panašių studentų pasirinkimus."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REKOMENDACIJOS.map((r) => <KursoKortele key={r.kursas.id} kursas={r.kursas} papildomaInfo={r.atitiktis} />)}
      </div>
    </Page>
  );
}
