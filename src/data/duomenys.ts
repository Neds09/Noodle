// Testiniai duomenys prototipui.
// Užduotyje duomenų pildymas neprivalomas, todėl duomenys tiesiog surašyti čia.

export type Role = "Svečias" | "Studentas" | "Dėstytojas" | "Administratorius";

export const ROLES: Role[] = ["Svečias", "Studentas", "Dėstytojas", "Administratorius"];

// Enumeratorius „Kategorija / pomėgių sritis“
export const SRITYS = ["IT", "Kulinarija", "Automobiliai", "Santykiai", "Kalbos", "Menas", "Muzika", "Sportas", "Verslas", "Mokslas"];

// Enumeratorius „Sudėtingumo lygis“
export const SUDETINGUMO_LYGIAI = ["Pradedantis", "Vidutinis", "Pažengęs"];

export interface Kursas {
  id: number;
  pavadinimas: string;
  aprasas: string;
  kategorija: string;
  sudetingumas: string;
  destytojas: string;
  busena: string; // „Laukia patvirtinimo“, „Paskelbtas“ arba „Grąžintas taisyti“
  dalyviai: number;
  reikalavimai: string;
}

export const KURSAI: Kursas[] = [
  { id: 1, pavadinimas: "Programavimo pagrindai su Python", aprasas: "Kintamieji, sąlygos, ciklai, funkcijos ir pirmieji projektai.", kategorija: "IT", sudetingumas: "Pradedantis", destytojas: "Rūta Kazlauskienė", busena: "Paskelbtas", dalyviai: 214, reikalavimai: "Nėra" },
  { id: 2, pavadinimas: "Duomenų bazės ir SQL", aprasas: "Reliacinis modelis, užklausos, normalizavimas, indeksai.", kategorija: "IT", sudetingumas: "Vidutinis", destytojas: "Rūta Kazlauskienė", busena: "Paskelbtas", dalyviai: 132, reikalavimai: "Programavimo pagrindai su Python" },
  { id: 3, pavadinimas: "Itališka virtuvė namuose", aprasas: "Šviežios makaronų tešlos, padažai ir rizoto technikos.", kategorija: "Kulinarija", sudetingumas: "Pradedantis", destytojas: "Marco Rossi", busena: "Paskelbtas", dalyviai: 87, reikalavimai: "Nėra" },
  { id: 4, pavadinimas: "Automobilio priežiūros ABC", aprasas: "Kaip patiems pasirūpinti automobiliu: tepalai, padangos, diagnostika.", kategorija: "Automobiliai", sudetingumas: "Pradedantis", destytojas: "Tomas Jonaitis", busena: "Paskelbtas", dalyviai: 59, reikalavimai: "Nėra" },
  { id: 5, pavadinimas: "Verslo anglų kalba", aprasas: "Laiškai, susitikimai ir prezentacijos anglų kalba.", kategorija: "Kalbos", sudetingumas: "Vidutinis", destytojas: "Laura Petraitė", busena: "Paskelbtas", dalyviai: 101, reikalavimai: "Nėra" },
  { id: 6, pavadinimas: "React ir TypeScript praktikumas", aprasas: "Komponentai, būsena, maršrutizavimas ir tipai.", kategorija: "IT", sudetingumas: "Pažengęs", destytojas: "Rūta Kazlauskienė", busena: "Laukia patvirtinimo", dalyviai: 0, reikalavimai: "Programavimo pagrindai su Python" },
  { id: 7, pavadinimas: "Muzikos teorija pradedantiesiems", aprasas: "Natos, intervalai, akordai ir ritmas.", kategorija: "Muzika", sudetingumas: "Pradedantis", destytojas: "Jonas Vaitkus", busena: "Laukia patvirtinimo", dalyviai: 0, reikalavimai: "Nėra" },
];

// Prisijungusio dėstytojo kursų id
export const MANO_KURSU_ID = [1, 2, 6];

export function rastiKursa(id: string | undefined): Kursas {
  const kursas = KURSAI.find((k) => String(k.id) === id);
  return kursas ?? KURSAI[0];
}

export interface Uzsiemimas {
  id: number;
  pavadinimas: string;
  medziaga: string[];
  testuId: number[];
  uzduocuId: number[];
}

export const UZSIEMIMAI: Uzsiemimas[] = [
  { id: 1, pavadinimas: "1. Įvadas ir aplinkos paruošimas", medziaga: ["ivadas.pdf", "Aplinkos diegimas (vaizdo įrašas)"], testuId: [1], uzduocuId: [] },
  { id: 2, pavadinimas: "2. Kintamieji ir duomenų tipai", medziaga: ["tipai.pptx"], testuId: [2], uzduocuId: [1] },
  { id: 3, pavadinimas: "3. Sąlygos ir ciklai", medziaga: ["ciklai.pdf"], testuId: [], uzduocuId: [2] },
];

export interface Klausimas {
  id: number;
  tekstas: string;
  tipas: string; // „Uždaras“ arba „Atviras“
  variantai: string[]; // tik uždarojo tipo klausimams
  teisingasVariantas: number; // teisingo varianto numeris nuo 1 (atviriesiems – 0)
  balas: number;
}

export interface Testas {
  id: number;
  pavadinimas: string;
  laikoLimitasMin: number;
  bandymuSkaicius: number;
  klausimai: Klausimas[];
}

export const TESTAI: Testas[] = [
  {
    id: 1, pavadinimas: "Įvado testas", laikoLimitasMin: 15, bandymuSkaicius: 2,
    klausimai: [
      { id: 1, tekstas: "Kokia komanda Python kalboje išveda tekstą į ekraną?", tipas: "Uždaras", variantai: ["echo()", "print()", "write()", "console.log()"], teisingasVariantas: 2, balas: 2 },
      { id: 2, tekstas: "Ar Python yra interpretuojama kalba?", tipas: "Uždaras", variantai: ["Taip", "Ne"], teisingasVariantas: 1, balas: 1 },
      { id: 3, tekstas: "Trumpai paaiškinkite, kas yra kintamasis.", tipas: "Atviras", variantai: [], teisingasVariantas: 0, balas: 3 },
    ],
  },
  {
    id: 2, pavadinimas: "Duomenų tipų testas", laikoLimitasMin: 20, bandymuSkaicius: 1,
    klausimai: [
      { id: 1, tekstas: "Koks yra reikšmės 3.14 tipas?", tipas: "Uždaras", variantai: ["int", "float", "str"], teisingasVariantas: 2, balas: 2 },
      { id: 2, tekstas: "Kuo skiriasi sąrašas (list) nuo kortežo (tuple)?", tipas: "Atviras", variantai: [], teisingasVariantas: 0, balas: 4 },
    ],
  },
];

export function rastiTesta(id: string | undefined): Testas {
  const testas = TESTAI.find((t) => String(t.id) === id);
  return testas ?? TESTAI[0];
}

export interface Uzduotis {
  id: number;
  pavadinimas: string;
  aprasymas: string;
  terminas: string;
  maksimalusBalas: number;
}

export const UZDUOTYS: Uzduotis[] = [
  { id: 1, pavadinimas: "Skaičiuotuvas", aprasymas: "Parašykite programą, kuri sudeda, atima, daugina ir dalina du įvestus skaičius.", terminas: "2026-11-15 23:59", maksimalusBalas: 10 },
  { id: 2, pavadinimas: "Daugybos lentelė", aprasymas: "Naudodami ciklus išveskite daugybos lentelę nuo 1 iki 10.", terminas: "2026-11-22 23:59", maksimalusBalas: 10 },
];

export function rastiUzduoti(id: string | undefined): Uzduotis {
  const uzduotis = UZDUOTYS.find((u) => String(u.id) === id);
  return uzduotis ?? UZDUOTYS[0];
}

export const SPRENDIMAI = [
  { id: 1, studentas: "Jonas Petraitis", pateikta: "2026-11-10 18:42", busena: "Pateikta", failas: "skaiciuotuvas.py" },
  { id: 2, studentas: "Eglė Kairytė", pateikta: "2026-11-12 09:05", busena: "Įvertinta", failas: "calc.py" },
  { id: 3, studentas: "Mantas Bružas", pateikta: "2026-11-16 00:31", busena: "Vėluojama", failas: "uzduotis1.py" },
];

export const NAUDOTOJAI = [
  { id: 1, vardas: "Jonas Petraitis", elPastas: "jonas@noodle.lt", role: "Studentas", registruotas: "2026-09-02" },
  { id: 2, vardas: "Eglė Kairytė", elPastas: "egle@noodle.lt", role: "Studentas", registruotas: "2026-09-05" },
  { id: 3, vardas: "Rūta Kazlauskienė", elPastas: "ruta@noodle.lt", role: "Dėstytojas", registruotas: "2026-08-20" },
  { id: 4, vardas: "Mantas Bružas", elPastas: "mantas@noodle.lt", role: "Studentas", registruotas: "2026-09-11" },
  { id: 5, vardas: "Admin Noodle", elPastas: "admin@noodle.lt", role: "Administratorius", registruotas: "2026-08-01" },
];

export const LYDERIAI = [
  { vieta: 1, vardas: "Eglė Kairytė", xp: 2480 },
  { vieta: 2, vardas: "Lukas Stankus", xp: 2215 },
  { vieta: 3, vardas: "Ieva Mažeikė", xp: 1990 },
  { vieta: 4, vardas: "Paulius Urbonas", xp: 1720 },
  { vieta: 5, vardas: "Gabija Rimkutė", xp: 1655 },
  { vieta: 6, vardas: "Dovydas Kurtinaitis", xp: 1510 },
  { vieta: 7, vardas: "Austėja Navickaitė", xp: 1380 },
  { vieta: 8, vardas: "Rokas Žukauskas", xp: 1270 },
  { vieta: 9, vardas: "Emilija Sabaliauskaitė", xp: 1105 },
  { vieta: 10, vardas: "Matas Grigas", xp: 990 },
  { vieta: 17, vardas: "Jonas Petraitis (jūs)", xp: 640 },
];

export const RIZIKOS_STUDENTAI = [
  { studentas: "Mantas Bružas", balas: 82, priezastis: "Neprisijungė 18 d., 2 praleisti terminai" },
  { studentas: "Kotryna Vilkaitė", balas: 71, priezastis: "Žemi testų rezultatai (vid. 41 %)" },
  { studentas: "Darius Lukoševičius", balas: 64, priezastis: "Lėtas pažangos tempas (12 % per 6 sav.)" },
];

export const APDOVANOJIMAI = [
  { pavadinimas: "Pirmasis žingsnis", kriterijus: "Baigtas pirmas užsiėmimas", xp: 50 },
  { pavadinimas: "Testų meistras", kriterijus: "5 testai išspręsti ≥ 90 %", xp: 200 },
  { pavadinimas: "Savaitės serija", kriterijus: "7 dienas iš eilės mokėsi", xp: 150 },
  { pavadinimas: "Kurso baigėjas", kriterijus: "Baigtas visas kursas", xp: 500 },
];

// Galiojantis sertifikatas, kurį galima patikrinti Sertifikato tikrinimo lange
export const DEMO_SERTIFIKATAS = {
  kodas: "NDL-2026-0042",
  savininkas: "Eglė Kairytė",
  kursas: "Programavimo pagrindai su Python",
  data: "2026-10-28",
  pazymys: 9.4,
};
