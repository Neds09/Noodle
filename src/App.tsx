// Visi prototipo langai ir jų adresai (maršrutai).
// Langų sąrašas atitinka ataskaitos 3.1 lentelę, navigacija – 3.30 pav. navigavimo planą.
// „Šalinimo patvirtinimo langas“ ir „Filtravimo langas“ yra dialogai, todėl atskiro adreso neturi.

import { HashRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RoleProvider } from "@/lib/role";

// Bendri langai
import { PagrindinisLangas } from "@/pages/bendri/PagrindinisLangas";
import { PrisijungimoLangas } from "@/pages/bendri/PrisijungimoLangas";
import { RegistracijosLangas } from "@/pages/bendri/RegistracijosLangas";
import { KodoIvedimoLangas } from "@/pages/bendri/KodoIvedimoLangas";
import { AdministravimoLangas } from "@/pages/bendri/AdministravimoLangas";
// Naudotojų posistemė
import { ProfilioLangas } from "@/pages/naudotojai/ProfilioLangas";
import { ProfilioRedagavimoLangas } from "@/pages/naudotojai/ProfilioRedagavimoLangas";
import { NaudotojuSarasoLangas } from "@/pages/naudotojai/NaudotojuSarasoLangas";
import { SertifikatoTikrinimoLangas } from "@/pages/naudotojai/SertifikatoTikrinimoLangas";
import { SertifikatoIsdavimoLangas } from "@/pages/naudotojai/SertifikatoIsdavimoLangas";
// Kursų posistemė
import { KursuSarasoLangas } from "@/pages/kursai/KursuSarasoLangas";
import { KursoAprasoLangas } from "@/pages/kursai/KursoAprasoLangas";
import { RekomenduojamuKursuLangas } from "@/pages/kursai/RekomenduojamuKursuLangas";
import { ManoKursuSarasoLangas } from "@/pages/kursai/ManoKursuSarasoLangas";
import { KursoKurimoLangas } from "@/pages/kursai/KursoKurimoLangas";
import { KursoRedagavimoLangas } from "@/pages/kursai/KursoRedagavimoLangas";
import { KursoUzsiemimuSarasoLangas } from "@/pages/kursai/KursoUzsiemimuSarasoLangas";
import { MedziagosIkelimoLangas } from "@/pages/kursai/MedziagosIkelimoLangas";
import { LaukianciuKursuSarasoLangas } from "@/pages/kursai/LaukianciuKursuSarasoLangas";
// Testų posistemė
import { TestoKurimoLangas } from "@/pages/testai/TestoKurimoLangas";
import { TestoRedagavimoLangas } from "@/pages/testai/TestoRedagavimoLangas";
import { TestoLangas } from "@/pages/testai/TestoLangas";
import { TestoRezultatuLangas } from "@/pages/testai/TestoRezultatuLangas";
// Užduočių posistemė
import { UzduotiesLangas } from "@/pages/uzduotys/UzduotiesLangas";
import { UzduotiesKurimoLangas } from "@/pages/uzduotys/UzduotiesKurimoLangas";
import { UzduotiesRedagavimoLangas } from "@/pages/uzduotys/UzduotiesRedagavimoLangas";
import { PateiktuSprendimuSarasoLangas } from "@/pages/uzduotys/PateiktuSprendimuSarasoLangas";
import { SprendimoVertinimoLangas } from "@/pages/uzduotys/SprendimoVertinimoLangas";
// Pažangos posistemė
import { PazangosLangas } from "@/pages/pazanga/PazangosLangas";
import { LyderiuLentelesLangas } from "@/pages/pazanga/LyderiuLentelesLangas";
import { KursoStatistikosLangas } from "@/pages/pazanga/KursoStatistikosLangas";
import { ApdovanojimuValdymoLangas } from "@/pages/pazanga/ApdovanojimuValdymoLangas";
import { RizikosStudentuLangas } from "@/pages/pazanga/RizikosStudentuLangas";

// HashRouter – adresai su #, todėl veikia ir atidarius be serverio.
// (MemoryRouter naudojamas tik peržiūros versijai claude.ai, kur adreso keisti negalima.)
const Router = import.meta.env.MODE === "perziura" ? MemoryRouter : HashRouter;

export default function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Bendri */}
            <Route path="/" element={<PagrindinisLangas />} />
            <Route path="/prisijungti" element={<PrisijungimoLangas />} />
            <Route path="/registruotis" element={<RegistracijosLangas />} />
            <Route path="/kodas" element={<KodoIvedimoLangas />} />
            <Route path="/admin" element={<AdministravimoLangas />} />

            {/* Naudotojų posistemė */}
            <Route path="/profilis" element={<ProfilioLangas />} />
            <Route path="/profilis/redaguoti" element={<ProfilioRedagavimoLangas />} />
            <Route path="/admin/naudotojai" element={<NaudotojuSarasoLangas />} />
            <Route path="/sertifikatas" element={<SertifikatoTikrinimoLangas />} />
            <Route path="/admin/sertifikatai" element={<SertifikatoIsdavimoLangas />} />

            {/* Kursų posistemė */}
            <Route path="/kursai" element={<KursuSarasoLangas />} />
            <Route path="/kursai/:id" element={<KursoAprasoLangas />} />
            <Route path="/rekomendacijos" element={<RekomenduojamuKursuLangas />} />
            <Route path="/mano-kursai" element={<ManoKursuSarasoLangas />} />
            <Route path="/mano-kursai/naujas" element={<KursoKurimoLangas />} />
            <Route path="/mano-kursai/:id/redaguoti" element={<KursoRedagavimoLangas />} />
            <Route path="/kursai/:id/uzsiemimai" element={<KursoUzsiemimuSarasoLangas />} />
            <Route path="/kursai/:id/medziaga" element={<MedziagosIkelimoLangas />} />
            <Route path="/admin/laukiantys-kursai" element={<LaukianciuKursuSarasoLangas />} />

            {/* Testų posistemė */}
            <Route path="/kursai/:id/testai/naujas" element={<TestoKurimoLangas />} />
            <Route path="/kursai/:id/testai/:testId/redaguoti" element={<TestoRedagavimoLangas />} />
            <Route path="/kursai/:id/testai/:testId" element={<TestoLangas />} />
            <Route path="/kursai/:id/testai/:testId/rezultatai" element={<TestoRezultatuLangas />} />

            {/* Užduočių posistemė */}
            <Route path="/kursai/:id/uzduotys/:taskId" element={<UzduotiesLangas />} />
            <Route path="/kursai/:id/uzduotys/nauja" element={<UzduotiesKurimoLangas />} />
            <Route path="/kursai/:id/uzduotys/:taskId/redaguoti" element={<UzduotiesRedagavimoLangas />} />
            <Route path="/kursai/:id/uzduotys/:taskId/sprendimai" element={<PateiktuSprendimuSarasoLangas />} />
            <Route path="/kursai/:id/uzduotys/:taskId/sprendimai/:sid" element={<SprendimoVertinimoLangas />} />

            {/* Pažangos posistemė */}
            <Route path="/pazanga" element={<PazangosLangas />} />
            <Route path="/lyderiai" element={<LyderiuLentelesLangas />} />
            <Route path="/mano-kursai/:id/statistika" element={<KursoStatistikosLangas />} />
            <Route path="/admin/apdovanojimai" element={<ApdovanojimuValdymoLangas />} />
            <Route path="/admin/rizika" element={<RizikosStudentuLangas />} />

            {/* Nežinomas adresas – grįžtama į pagrindinį langą */}
            <Route path="*" element={<PagrindinisLangas />} />
          </Route>
        </Routes>
      </Router>
    </RoleProvider>
  );
}
