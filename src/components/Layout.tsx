// Bendras puslapio karkasas: viršutinė juosta su rolės pasirinkimu ir turinio vieta.

import type { ReactNode } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useRole } from "@/lib/role";
import { ROLES, type Role } from "@/data/duomenys";

export function Layout() {
  const { role, setRole } = useRole();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-14 items-center justify-between gap-3">
          {/* Logotipas visada veda į pagrindinį langą */}
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg">Noodle</span>
          </Link>

          <div className="flex items-center gap-2">
            <label htmlFor="role" className="hidden sm:block text-xs text-muted-foreground">
              Demonstracinė rolė
            </label>
            <Select id="role" value={role} onChange={(e) => setRole(e.target.value as Role)} className="h-8 w-44 text-xs">
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <Outlet />
      </main>

      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        IS „Noodle“ – GUI prototipas (P170B114, L3). Duomenys testiniai.
      </footer>
    </div>
  );
}

interface PageProps {
  langas: string; // lango pavadinimas iš navigavimo plano
  title: string;
  subtitle?: string;
  actions?: ReactNode; // mygtukai dešinėje
  showBack?: boolean;
  children: ReactNode;
}

// Kiekvieno lango antraštė. Rodo ir lango («boundary» klasės) pavadinimą.
export function Page({ langas, title, subtitle, actions, showBack = true, children }: PageProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {showBack && (
              <Button variant="ghost" size="icon" className="h-7 w-7 -ml-1" onClick={() => navigate(-1)} aria-label="Atgal">
                <ArrowLeft />
              </Button>
            )}
            <span className="rounded border border-dashed border-primary/50 bg-primary/5 px-1.5 py-0.5 text-[11px] font-medium text-primary">
              «boundary» {langas}
            </span>
          </div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

// Formos laukas: pavadinimas + įvesties elementas + (nebūtinas) paaiškinimas
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

// Kortelė-nuoroda, naudojama pagrindiniame ir administravimo languose
export function MenuTile({ to, icon, title, text }: { to: string; icon: ReactNode; title: string; text: string }) {
  return (
    <Link to={to} className="group block rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{text}</div>
        </div>
      </div>
    </Link>
  );
}
