// Demonstracinė naudotojo rolė.
// Tikro prisijungimo prototipe nėra – rolė laikoma React kontekste.

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Role } from "@/data/duomenys";

interface RoleContext {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleCtx = createContext<RoleContext>({ role: "Svečias", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Svečias");
  return <RoleCtx.Provider value={{ role, setRole }}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  return useContext(RoleCtx);
}

// Aktorių generalizacija: Studentas → Dėstytojas → Administratorius.
// Pvz. turiTeises("Dėstytojas", "Studentas") === true
export function turiTeises(role: Role, minimaliRole: Role): boolean {
  const lygis = { Svečias: 0, Studentas: 1, Dėstytojas: 2, Administratorius: 3 };
  return lygis[role] >= lygis[minimaliRole];
}
