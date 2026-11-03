// Langas: Kursų sąrašo langas (kursų katalogas)
// Panaudojimo atvejis: Peržiūrėti kursą
// Navigacija: → Filtravimo langas (dialogas), → Kurso aprašo langas

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KURSAI } from "@/data/duomenys";
import { KursoKortele } from "./KursoKortele";
import { FiltravimoLangas, type Filtras } from "./FiltravimoLangas";

export function KursuSarasoLangas() {
  const [paieska, setPaieska] = useState("");
  const [filtras, setFiltras] = useState<Filtras>({ kategorija: "", sudetingumas: "" });
  const [filtrasAtidarytas, setFiltrasAtidarytas] = useState(false);

  // Rodomi tik paskelbti kursai, atitinkantys paiešką ir filtrą
  const rodomiKursai = KURSAI.filter((k) => {
    if (k.busena !== "Paskelbtas") return false;
    if (!k.pavadinimas.toLowerCase().includes(paieska.toLowerCase())) return false;
    if (filtras.kategorija && k.kategorija !== filtras.kategorija) return false;
    if (filtras.sudetingumas && k.sudetingumas !== filtras.sudetingumas) return false;
    return true;
  });

  const yraFiltras = filtras.kategorija !== "" || filtras.sudetingumas !== "";

  return (
    <Page
      langas="Kursų sąrašo langas"
      title="Kursų katalogas"
      actions={<Button variant="outline" onClick={() => setFiltrasAtidarytas(true)}><Filter /> Filtruoti</Button>}
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Ieškoti kurso..." value={paieska} onChange={(e) => setPaieska(e.target.value)} />
      </div>

      {yraFiltras && (
        <div className="flex items-center gap-2 text-sm">
          Filtrai:
          {filtras.kategorija && <Badge variant="secondary">{filtras.kategorija}</Badge>}
          {filtras.sudetingumas && <Badge variant="secondary">{filtras.sudetingumas}</Badge>}
          <Button variant="link" size="sm" onClick={() => setFiltras({ kategorija: "", sudetingumas: "" })}>Išvalyti</Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rodomiKursai.map((k) => <KursoKortele key={k.id} kursas={k} />)}
      </div>
      {rodomiKursai.length === 0 && <p className="text-sm text-muted-foreground">Kursų pagal pasirinktus kriterijus nerasta.</p>}

      {filtrasAtidarytas && (
        <FiltravimoLangas
          atidarytas={filtrasAtidarytas}
          uzdaryti={() => setFiltrasAtidarytas(false)}
          pradinisFiltras={filtras}
          taikyti={setFiltras}
        />
      )}
    </Page>
  );
}
