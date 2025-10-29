import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ShoppingBag, AlertTriangle } from "lucide-react";

export function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8 md:space-y-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <ShoppingBag className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            Where to Buy Reef-Safe Sunscreen in Miami
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-xs text-muted-foreground sm:text-sm md:mb-5">
            Look for mineral-based sunscreens (Zinc Oxide or Titanium Dioxide)
            at these common locations.
          </p>
          <div className="space-y-3">
            <a
              href="https://www.google.com/search?q=cvs+walgreens+near+me+miami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-auto w-full justify-between rounded-full py-3"
                asChild
              >
                <span className="font-medium text-sm sm:text-base">
                  Local Pharmacies (CVS, Walgreens)
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </Button>
            </a>
            <a
              href="https://www.google.com/search?q=west+marine+miami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-auto w-full justify-between rounded-full py-3"
                asChild
              >
                <span className="font-medium text-sm sm:text-base">
                  Boating & Dive Shops (West Marine)
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </Button>
            </a>
            <a
              href="https://www.google.com/search?q=publix+near+me+miami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-auto w-full justify-between rounded-full py-3"
                asChild
              >
                <span className="font-medium text-sm sm:text-base">
                  Supermarkets (Publix)
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive sm:h-6 sm:w-6" />
            Why Are Chemical Sunscreens Harmful?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base md:space-y-4">
          <p>
            Many common sunscreens contain chemicals that are highly toxic to
            coral reefs. The two most widely recognized harmful ingredients are
            <strong className="font-semibold text-foreground">
              {" "}
              oxybenzone
            </strong>{" "}
            and
            <strong className="font-semibold text-foreground">
              {" "}
              octinoxate
            </strong>
            . When these chemicals wash off your skin, they enter the water and
            can have devastating effects on marine ecosystems, even at very low
            concentrations.
          </p>
          <p>
            These chemicals contribute directly to
            <strong className="font-semibold text-foreground">
              {" "}
              coral bleaching
            </strong>{" "}
            by lowering the temperature at which corals expel their symbiotic
            algae, leaving them stressed and colorless. They also cause DNA
            damage, disrupt coral reproduction, and cause deformities in coral
            larvae.
          </p>
          <p>
            To protect the delicate reefs of Miami, it is best to choose
            <strong className="font-semibold text-foreground">
              {" "}
              mineral-based
            </strong>{" "}
            sunscreens. Look for products that list
            <strong className="font-semibold text-foreground">
              {" "}
              zinc oxide
            </strong>{" "}
            or
            <strong className="font-semibold text-foreground">
              {" "}
              titanium dioxide
            </strong>{" "}
            as their active ingredients. These ingredients sit on top of the
            skin and physically block UV rays.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
