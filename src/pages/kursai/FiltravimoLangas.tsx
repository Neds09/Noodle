// Langas: Filtravimo langas (modalinis dialogas)
// Panaudojimo atvejis: Peržiūrėti kursą
// Atidaromas iš: Kursų sąrašo lango (mygtukas „Filtruoti“)

import { useState } from "react";
import { Filter } from "lucide-react";
import { Field } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SRITYS, SUDETINGUMO_LYGIAI } from "@/data/duomenys";

export interface Filtras {
  kategorija: string; // "" reiškia „visos“
  sudetingumas: string;
}

interface Props {
  atidarytas: boolean;
  uzdaryti: () => void;
  pradinisFiltras: Filtras;
  taikyti: (filtras: Filtras) => void;
}

export function FiltravimoLangas({ atidarytas, uzdaryti, pradinisFiltras, taikyti }: Props) {
  const [kategorija, setKategorija] = useState(pradinisFiltras.kategorija);
  const [sudetingumas, setSudetingumas] = useState(pradinisFiltras.sudetingumas);

  function paspaustaTaikyti() {
    taikyti({ kategorija, sudetingumas });
    uzdaryti();
  }

  return (
    <Dialog open={atidarytas} onOpenChange={(open) => !open && uzdaryti()}>
      <DialogContent>
        <DialogHeader>
          <Badge variant="outline" className="w-fit border-dashed border-primary/50 text-primary">«boundary» Filtravimo langas</Badge>
          <DialogTitle>Filtruoti kursus</DialogTitle>
        </DialogHeader>
        <Field label="Kategorija">
          <Select value={kategorija} onChange={(e) => setKategorija(e.target.value)}>
            <option value="">Visos</option>
            {SRITYS.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Sudėtingumo lygis">
          <Select value={sudetingumas} onChange={(e) => setSudetingumas(e.target.value)}>
            <option value="">Visi</option>
            {SUDETINGUMO_LYGIAI.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <DialogFooter>
          <Button onClick={paspaustaTaikyti}><Filter /> Taikyti</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
