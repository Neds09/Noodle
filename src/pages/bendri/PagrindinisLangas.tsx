// Langas: Pagrindinis langas
// Panaudojimo atvejai: Atsijungti (ir pradžia visiems kitiems)
// Navigacija: → Prisijungimo, Registracijos, Kursų sąrašo, Sertifikato tikrinimo, Rekomenduojamų kursų,
//             Pažangos, Lyderių lentelės, Profilio, Mano kursų sąrašo, Administravimo langai
// Rodomi meniu punktai priklauso nuo rolės.

import {
  BarChart3, BookOpen, GraduationCap, LayoutGrid, LogIn, LogOut, ShieldCheck, Sparkles, Trophy, UserPlus, UserRound,
} from "lucide-react";
import { MenuTile, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { turiTeises, useRole } from "@/lib/role";

export function PagrindinisLangas() {
  const { role, setRole } = useRole();
  const yraSvecias = role === "Svečias";
  const yraStudentas = turiTeises(role, "Studentas");
  const yraDestytojas = turiTeises(role, "Dėstytojas");
  const yraAdministratorius = role === "Administratorius";

  function atsijungti() {
    setRole("Svečias");
  }

  return (
    <Page
      langas="Pagrindinis langas"
      title={yraSvecias ? "Sveiki atvykę į Noodle" : "Sveiki sugrįžę!"}
      subtitle={yraSvecias ? "Mokymosi kursų platforma: kursai, testai, užduotys ir pažangos stebėjimas." : `Prisijungta kaip: ${role}`}
      showBack={false}
      actions={!yraSvecias && <Button variant="outline" onClick={atsijungti}><LogOut /> Atsijungti</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {yraSvecias && <MenuTile to="/prisijungti" icon={<LogIn />} title="Prisijungti" text="Prisijunkite prie savo paskyros" />}
        {yraSvecias && <MenuTile to="/registruotis" icon={<UserPlus />} title="Registruotis" text="Susikurkite naują paskyrą" />}

        <MenuTile to="/kursai" icon={<BookOpen />} title="Kursų katalogas" text="Peržiūrėkite ir filtruokite kursus" />
        <MenuTile to="/sertifikatas" icon={<ShieldCheck />} title="Patikrinti sertifikatą" text="Patikrinkite sertifikato galiojimą pagal kodą" />

        {yraStudentas && <MenuTile to="/rekomendacijos" icon={<Sparkles />} title="Rekomenduojami kursai" text="Kursai pagal jūsų pomėgius ir istoriją" />}
        {yraStudentas && <MenuTile to="/pazanga" icon={<BarChart3 />} title="Mano pažanga" text="Baigti užsiėmimai, rezultatai ir XP" />}
        {yraStudentas && <MenuTile to="/lyderiai" icon={<Trophy />} title="Lyderių lentelė" text="Palyginkite save su kitais studentais" />}
        {yraStudentas && <MenuTile to="/profilis" icon={<UserRound />} title="Mano profilis" text="Asmeninė informacija ir pomėgiai" />}

        {yraDestytojas && <MenuTile to="/mano-kursai" icon={<GraduationCap />} title="Mano kursai" text="Kurkite ir valdykite savo kursus" />}
        {yraAdministratorius && <MenuTile to="/admin" icon={<LayoutGrid />} title="Administravimas" text="Naudotojai, kursų tvirtinimas, apdovanojimai" />}
      </div>

      {yraSvecias && (
        <Alert variant="info">
          <AlertDescription>Prototipe rolę galite pakeisti viršuje („Demonstracinė rolė“) arba prisijungę.</AlertDescription>
        </Alert>
      )}
    </Page>
  );
}
