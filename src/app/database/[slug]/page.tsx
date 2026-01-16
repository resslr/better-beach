import { harmfulMaterials } from "@/lib/harmful-materials";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExclamationTriangleIcon as AlertTriangle } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return harmfulMaterials.map((material) => ({
    slug: material.id,
  }));
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params;
  const material = harmfulMaterials.find((m) => m.id === slug);

  if (!material) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            {material.name}
          </CardTitle>
          <div className="mt-2 space-y-1">
            <p className="font-mono text-lg font-semibold text-foreground">
              {material.chemicalFormula}
            </p>
            {material.aliases && (
              <p className="text-sm text-muted-foreground">
                Also known as: {material.aliases.join(", ")}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-lg leading-relaxed text-foreground">
          <p>{material.description}</p>
        </CardContent>
      </Card>
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="/database">← Back to Database</Link>
        </Button>
      </div>
    </div>
  );
}
