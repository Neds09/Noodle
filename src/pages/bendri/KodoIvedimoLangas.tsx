// Langas: Kodo įvedimo langas
// Panaudojimo atvejai: Registruotis, Redaguoti profilį (pakeitus el. paštą)
// Navigacija: išeinančių jungčių nėra

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { Field, Page } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function KodoIvedimoLangas() {
  // ?nuo=registracija arba ?nuo=profilis – iš kurio lango atėjome
  const [params] = useSearchParams();
  const isProfilio = params.get("nuo") === "profilis";

  const [kodas, setKodas] = useState("");
  const [rezultatas, setRezultatas] = useState<"" | "teisingas" | "neteisingas">("");

  function patvirtinti() {
    // Prototipe tinka bet kuris 6 skaitmenų kodas, išskyrus 000000
    if (kodas.length === 6 && kodas !== "000000") {
      setRezultatas("teisingas");
    } else {
      setRezultatas("neteisingas");
    }
  }

  return (
    <Page
      langas="Kodo įvedimo langas"
      title="Patvirtinimo kodas"
      subtitle={isProfilio ? "Kodą išsiuntėme naujuoju el. pašto adresu." : "Kodą išsiuntėme jūsų el. paštu."}
    >
      <Card className="mx-auto max-w-sm">
        <CardContent className="space-y-4 pt-5">
          {rezultatas === "teisingas" && (
            <Alert variant="success">
              <AlertTitle>Patvirtinta</AlertTitle>
              <AlertDescription>{isProfilio ? "El. pašto adresas atnaujintas." : "Paskyra aktyvuota. Galite prisijungti."}</AlertDescription>
            </Alert>
          )}
          {rezultatas === "neteisingas" && (
            <Alert variant="destructive">
              <AlertDescription>Kodas neteisingas arba pasibaigęs.</AlertDescription>
            </Alert>
          )}
          <Field label="6 skaitmenų kodas" hint="Prototipe tinka bet kuris 6 skaitmenų kodas, išskyrus 000000.">
            <Input
              inputMode="numeric"
              maxLength={6}
              value={kodas}
              onChange={(e) => setKodas(e.target.value.replace(/\D/g, ""))}
              className="text-center text-lg tracking-[0.5em]"
            />
          </Field>
          <Button className="w-full" onClick={patvirtinti}><KeyRound /> Patvirtinti</Button>
        </CardContent>
      </Card>
    </Page>
  );
}
