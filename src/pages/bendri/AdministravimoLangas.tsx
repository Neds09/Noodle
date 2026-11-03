// Langas: Administravimo langas
// Panaudojimo atvejai: Patvirtinti kursą, Šalinti profilį, Skirti apdovanojimus, Nustatyti rizikos studentus, Išduoti sertifikatą
// Navigacija: → Laukiančių kursų sąrašo, Naudotojų sąrašo, Apdovanojimų valdymo, Rizikos studentų, Sertifikato išdavimo langai

import { AlertTriangle, Award, ClipboardCheck, FileBadge, Users } from "lucide-react";
import { MenuTile, Page } from "@/components/Layout";

export function AdministravimoLangas() {
  return (
    <Page langas="Administravimo langas" title="Administravimas" subtitle="Platformos valdymo funkcijos.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MenuTile to="/admin/laukiantys-kursai" icon={<ClipboardCheck />} title="Kursai, laukiantys patvirtinimo" text="Peržiūrėkite ir patvirtinkite kursus" />
        <MenuTile to="/admin/naudotojai" icon={<Users />} title="Naudotojai" text="Naudotojų sąrašas ir paskyrų šalinimas" />
        <MenuTile to="/admin/apdovanojimai" icon={<Award />} title="Apdovanojimai" text="Taisyklės ir apdovanojimų skyrimas" />
        <MenuTile to="/admin/rizika" icon={<AlertTriangle />} title="Rizikos studentai" text="Studentai, kuriems reikia pagalbos" />
        <MenuTile to="/admin/sertifikatai" icon={<FileBadge />} title="Sertifikatų išdavimas" text="Išduokite kurso baigimo sertifikatą" />
      </div>
    </Page>
  );
}
