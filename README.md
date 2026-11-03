# IS „Noodle“ – GUI prototipas (L3)

Grafinės naudotojo sąsajos maketas pagal ataskaitos 3.2 skyriaus navigavimo planą (3.30 pav.) ir langų sąrašą (3.1 lentelė).
Realizuoti **visi 35 langai** ir **visos 41 navigavimo plano jungtys**; kitų jungčių tarp langų nėra.
Duomenys testiniai (užduotyje duomenų pildymas neprivalomas).

Technologijos (kaip L1 „Realizacinės priemonės“): React + TypeScript, Vite, TailwindCSS, shadcn/ui, React Router.

## Paleidimas

Reikia Node.js (LTS versijos iš https://nodejs.org).

```bash
npm install      # tik pirmą kartą
npm run dev      # atidaryti http://localhost:5173
```

## Kaip veikia kodas

- **Vienas langas = vienas failas.** Kiekvienas langas yra `src/pages/<posistemė>/<LangoPavadinimas>.tsx`,
  pvz. „Testo langas“ → `src/pages/testai/TestoLangas.tsx`.
- **Kiekvieno failo viršuje** parašyta: kuris tai langas, kuriuos panaudojimo atvejus jis realizuoja
  ir į kuriuos langus iš jo galima pereiti (pagal navigavimo planą).
- **Maršrutai** (kuris langas atidaromas kokiu adresu) surašyti `src/App.tsx`.
- **Navigacija** tarp langų – tai `<Link to="...">` nuorodos arba `navigate("...")` iškvietimai.
- **Rolė** (Svečias / Studentas / Dėstytojas / Administratorius) pasirenkama viršuje ir saugoma `src/lib/role.tsx`.
  Funkcija `turiTeises(role, "Studentas")` realizuoja aktorių generalizaciją.
- **Duomenys** – `src/data/duomenys.ts` (paprasti masyvai, jokios duomenų bazės).
- `src/components/ui/` – shadcn/ui komponentai (mygtukai, kortelės, lentelės, dialogai). Juos generuoja shadcn
  ir paprastai neredaguojama.
- `src/components/Layout.tsx` – bendras karkasas: viršutinė juosta, lango antraštė (`Page`), formos laukas (`Field`).

Logotipas „Noodle“ grąžina į pagrindinį langą, rodyklė ← – į ankstesnį langą (bendri naršymo veiksmai).
„Šalinimo patvirtinimo langas“ ir „Filtravimo langas“ realizuoti kaip dialogai.

### Kaip pridėti naują langą

1. Sukurti failą, pvz. `src/pages/kursai/NaujasLangas.tsx`, nukopijavus panašų langą.
2. `src/App.tsx` pridėti eilutę `<Route path="/naujas" element={<NaujasLangas />} />`.
3. Lange, iš kurio turi būti galima pereiti, pridėti `<Link to="/naujas">...</Link>`.

## Langai ir maršrutai

| Nr. | Langas | Maršrutas |
|---|---|---|
| 1 | Pagrindinis langas | `/` |
| 2 | Prisijungimo langas | `/prisijungti` |
| 3 | Registracijos langas | `/registruotis` |
| 4 | Kodo įvedimo langas | `/kodas` |
| 5 | Šalinimo patvirtinimo langas | (dialogas: Kurso užsiėmimų sąrašo ir Naudotojų sąrašo languose) |
| 6 | Administravimo langas | `/admin` |
| 7 | Profilio langas | `/profilis` |
| 8 | Profilio redagavimo langas | `/profilis/redaguoti` |
| 9 | Naudotojų sąrašo langas | `/admin/naudotojai` |
| 10 | Sertifikato tikrinimo langas | `/sertifikatas` |
| 11 | Sertifikato išdavimo langas | `/admin/sertifikatai` |
| 12 | Kursų sąrašo langas | `/kursai` |
| 13 | Filtravimo langas | (dialogas: Kursų sąrašo lange, mygtukas „Filtruoti“) |
| 14 | Kurso aprašo langas | `/kursai/:id` |
| 15 | Rekomenduojamų kursų langas | `/rekomendacijos` |
| 16 | Mano kursų sąrašo langas | `/mano-kursai` |
| 17 | Kurso kūrimo langas | `/mano-kursai/naujas` |
| 18 | Kurso redagavimo langas | `/mano-kursai/:id/redaguoti` |
| 19 | Kurso užsiėmimų sąrašo langas | `/kursai/:id/uzsiemimai` |
| 20 | Medžiagos įkėlimo langas | `/kursai/:id/medziaga` |
| 21 | Laukiančių kursų sąrašo langas | `/admin/laukiantys-kursai` |
| 22 | Testo kūrimo langas | `/kursai/:id/testai/naujas` |
| 23 | Testo redagavimo langas | `/kursai/:id/testai/:id/redaguoti` |
| 24 | Testo langas | `/kursai/:id/testai/:id` |
| 25 | Testo rezultatų langas | `/kursai/:id/testai/:id/rezultatai` |
| 26 | Užduoties langas | `/kursai/:id/uzduotys/:id` |
| 27 | Užduoties kūrimo langas | `/kursai/:id/uzduotys/nauja` |
| 28 | Užduoties redagavimo langas | `/kursai/:id/uzduotys/:id/redaguoti` |
| 29 | Pateiktų sprendimų sąrašo langas | `/kursai/:id/uzduotys/:id/sprendimai` |
| 30 | Sprendimo vertinimo langas | `/kursai/:id/uzduotys/:taskId/sprendimai/:sid` |
| 31 | Pažangos langas | `/pazanga` |
| 32 | Lyderių lentelės langas | `/lyderiai` |
| 33 | Kurso statistikos langas | `/mano-kursai/:id/statistika` |
| 34 | Apdovanojimų valdymo langas | `/admin/apdovanojimai` |
| 35 | Rizikos studentų langas | `/admin/rizika` |

## Struktūra

```
src/
  App.tsx                 visi langai ir jų adresai
  main.tsx                programos paleidimas
  components/Layout.tsx   bendras karkasas, lango antraštė
  components/ui/          shadcn/ui komponentai
  data/duomenys.ts        testiniai duomenys
  lib/role.tsx            demonstracinė rolė
  pages/bendri/           Pagrindinis, Prisijungimo, Registracijos, Kodo įvedimo, Administravimo, Šalinimo patvirtinimo
  pages/naudotojai/       Naudotojų posistemės langai
  pages/kursai/           Kursų posistemės langai
  pages/testai/           Testų posistemės langai
  pages/uzduotys/         Užduočių posistemės langai
  pages/pazanga/          Pažangos posistemės langai
```

Kodas parengtas naudojant DI įrankį (Claude); dėstytojas leido DI naudojimą.
