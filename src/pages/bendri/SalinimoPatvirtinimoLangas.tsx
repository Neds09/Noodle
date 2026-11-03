// Langas: Šalinimo patvirtinimo langas (modalinis dialogas)
// Panaudojimo atvejai: Šalinti testą, Šalinti užduotį, Šalinti profilį
// Atidaromas iš: Kurso užsiėmimų sąrašo lango, Naudotojų sąrašo lango

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  atidarytas: boolean;
  uzdaryti: () => void;
  kaSalinama: string; // pvz. „testas „Įvado testas““
  ispejimas?: string;
  patvirtinti: () => void;
}

export function SalinimoPatvirtinimoLangas({ atidarytas, uzdaryti, kaSalinama, ispejimas, patvirtinti }: Props) {
  function salinti() {
    patvirtinti();
    uzdaryti();
  }

  return (
    <Dialog open={atidarytas} onOpenChange={(open) => !open && uzdaryti()}>
      <DialogContent>
        <DialogHeader>
          <Badge variant="outline" className="w-fit border-dashed border-primary/50 text-primary">
            «boundary» Šalinimo patvirtinimo langas
          </Badge>
          <DialogTitle>Ar tikrai norite pašalinti?</DialogTitle>
          <DialogDescription>
            Bus pašalinta: <b className="text-foreground">{kaSalinama}</b>.
          </DialogDescription>
        </DialogHeader>
        {ispejimas && (
          <Alert variant="destructive">
            <AlertDescription>{ispejimas}</AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={uzdaryti}>Atšaukti</Button>
          <Button variant="destructive" onClick={salinti}>Pašalinti</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
