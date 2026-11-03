// Pomėgių sričių pasirinkimas (naudojamas Registracijos ir Profilio redagavimo languose).

import { SRITYS } from "@/data/duomenys";

interface Props {
  pasirinktos: string[];
  onChange: (naujos: string[]) => void;
}

export function PomegiuPasirinkimas({ pasirinktos, onChange }: Props) {
  function perjungti(sritis: string) {
    if (pasirinktos.includes(sritis)) {
      onChange(pasirinktos.filter((s) => s !== sritis));
    } else {
      onChange([...pasirinktos, sritis]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {SRITYS.map((sritis) => {
        const pazymeta = pasirinktos.includes(sritis);
        const stilius = pazymeta ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-accent";
        return (
          <button key={sritis} type="button" onClick={() => perjungti(sritis)} className={`rounded-full border px-3 py-1 text-xs ${stilius}`}>
            {sritis}
          </button>
        );
      })}
    </div>
  );
}
