import { Card, CardContent } from "@/components/ui/card";

export default function EthosPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 md:space-y-12 md:py-12">
      <div className="space-y-3 text-center md:space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Our Ethos
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
          Protecting our oceans, one sunscreen at a time
        </p>
      </div>

      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="space-y-3 pt-4 md:space-y-4 md:pt-6">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Our Commitment
          </h2>
          <div className="space-y-2.5 text-sm text-muted-foreground sm:text-base md:space-y-3">
            <p>
              <strong className="text-foreground">Transparency:</strong>{" "}
              BetterBeach provides clear, science-based information about
              harmful sunscreen ingredients and their effects on marine
              ecosystems (specifically Coral Reefs).
            </p>
            <p>
              <strong className="text-foreground">Accessibility:</strong>{" "}
              BetterBeach tools are free and easy to use, making reef-safe
              choices simple for everyone.
            </p>
            <p>
              <strong className="text-foreground">Accuracy:</strong> BetterBeach
              stays updated with the latest research on marine toxicology and
              reef conservation to ensure our information is current and
              reliable.
              <small className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                If you have any updates for any non-listed harmful ingredients,
                please email{" "}
                <a
                  href="mailto:info@betterbeach.app"
                  className="underline hover:text-primary focus:text-primary"
                  aria-label="Email info@betterbeach.app"
                >
                  info@betterbeach.app
                </a>
                !
              </small>
            </p>
            <p>
              <strong className="text-foreground">Impact:</strong> BetterBeach
              is dedicated to creating real change by helping people make
              informed decisions that protect our oceans.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-linear-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 p-6 text-center md:p-8">
        <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:mb-4">
          Join the Movement
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
          Every time you choose a reef-safe sunscreen, you&apos;re contributing
          to the preservation of our oceans. Together, we can protect coral
          reefs, marine life, and the future of our planet.
        </p>
      </div>
    </div>
  );
}
