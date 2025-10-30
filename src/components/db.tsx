"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { harmfulMaterials } from "@/lib/harmful-materials";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = harmfulMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.aliases?.some((alias) =>
        alias.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:space-y-8 md:py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Harmful Materials Database
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg md:mt-4">
          Click on a material to learn more about its effects on marine
          ecosystems.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5" />
        <Input
          type="search"
          placeholder="Search by name..."
          className="h-11 rounded-full pl-9 text-sm sm:h-12 sm:pl-10 sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search harmful materials"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredMaterials.map((material) => (
          <Link
            href={`/database/${material.id}`}
            key={material.id}
            className="block"
          >
            <Card className="h-full transition-all hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex-1">
                  <CardTitle>{material.name}</CardTitle>
                  {material.aliases && (
                    <CardDescription>
                      Also known as: {material.aliases.join(", ")}
                    </CardDescription>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
