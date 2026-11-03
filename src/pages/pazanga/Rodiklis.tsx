// Mažas rodiklio blokas (pvz. „Baigta užsiėmimų: 67 %“), naudojamas Pažangos ir Kurso statistikos languose.

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function Rodiklis({ pavadinimas, reiksme, paaiskinimas }: { pavadinimas: string; reiksme: string; paaiskinimas?: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="text-xs text-muted-foreground">{pavadinimas}</div>
        <div className="text-2xl font-semibold">{reiksme}</div>
        {paaiskinimas && <div className="text-xs text-muted-foreground">{paaiskinimas}</div>}
      </CardContent>
    </Card>
  );
}

// Eilutė su pavadinimu, procentais ir juostele
export function ProcentuEilute({ pavadinimas, procentai }: { pavadinimas: string; procentai: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between gap-2">
        <span>{pavadinimas}</span>
        <span className="text-muted-foreground">{procentai} %</span>
      </div>
      <Progress value={procentai} />
    </div>
  );
}
