"use client";

import { createWorker, OEM } from "tesseract.js";
import type { Worker as TesseractWorker } from "tesseract.js";
import Image from "next/image";
import { CameraIcon as Camera, ArrowUpTrayIcon as Upload, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  harmfulMaterials,
  bannedIngredients,
  ocrVariants,
} from "@/lib/harmful-materials";

type AnalysisStatus = "safe" | "harmful" | null;

export function ScanPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisStatus>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisDetails, setAnalysisDetails] = useState<{
    harmful: string[];
    negated: string[];
    claims: string[];
  } | null>(null);

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getIngredientDbId = (ingredient: string): string | null => {
    const lowerIng = ingredient.toLowerCase();
    const material = harmfulMaterials.find(
      (m) =>
        m.name.toLowerCase() === lowerIng ||
        m.id === lowerIng ||
        m.aliases?.some((alias) => alias.toLowerCase() === lowerIng),
    );
    return material?.id || null;
  };

  const splitOcrToItems = (text: string): string[] => {
    return Array.from(
      new Set(
        text
          .replace(/\s{2,}/g, " ") // collapse multi-spaces
          .split(/[\n,;•·]+/g) // common separators in labels
          .map((s) => s.trim())
          .filter(
            (s) =>
              s.length > 1 &&
              !/^(ingredients|inactive ingredients|active ingredients)\b/i.test(
                s,
              ),
          ),
      ),
    ).slice(0, 400);
  };

  const matchesBannedIngredient = (token: string) => {
    const lower = token.toLowerCase().replace(/[^a-z]/g, "");

    // Check exact matches first
    for (const ing of bannedIngredients) {
      const pattern = new RegExp(
        `\\b${escapeRegExp(ing).replace(/[\s-]+/g, "[\\s-]*")}\\b`,
        "i",
      );
      if (pattern.test(token)) return true;
    }

    // Check OCR variants
    for (const [ingredient, variants] of Object.entries(ocrVariants)) {
      const cleanIngredient = ingredient.replace(/[^a-z]/g, "");
      if (lower.includes(cleanIngredient)) return true;

      for (const variant of variants) {
        const cleanVariant = variant.replace(/[^a-z]/g, "");
        if (lower.includes(cleanVariant)) return true;
      }
    }

    return false;
  };

  const analyzeTextDetailed = (
    text: string,
  ): {
    status: AnalysisStatus;
    harmful: string[];
    negated: string[];
    claims: string[];
  } => {
    const normalized = text.toLowerCase();

    const toPattern = (term: string) => {
      const escaped = term
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/[\s-]+/g, "[\\s-]*");
      return new RegExp(`\\b${escaped}\\b`, "i");
    };
    const oxyAliases = [
      "oxybenzone",
      "benzophenone-3",
      "benzophenone 3",
      "bp-3",
      "bp3",
    ];

    const freePhrases = (alias: string) => [
      new RegExp(
        `\\b${alias.replace(/[-\s]+/g, "[-\\s]*")}[-\\s]*free\\b`,
        "i",
      ),
      new RegExp(
        `\\bfree\\s+of\\s+${alias.replace(/[-\s]+/g, "[-\\s]*")}\\b`,
        "i",
      ),
      new RegExp(`\\bno\\s+${alias.replace(/[-\s]+/g, "[-\\s]*")}\\b`, "i"),
      new RegExp(
        `\\bwithout\\s+${alias.replace(/[-\s]+/g, "[-\\s]*")}\\b`,
        "i",
      ),
      new RegExp(`\\b0%\\s*${alias.replace(/[-\s]+/g, "[-\\s]*")}\\b`, "i"),
      new RegExp(
        `\\bdoes\\s+not\\s+contain\\s+${alias.replace(
          /[-\s]+/g,
          "[-\\s]*",
        )}\\b`,
        "i",
      ),
    ];

    let oxyFree = false;
    const claims: string[] = [];
    const negated: string[] = [];

    for (const alias of oxyAliases) {
      for (const re of freePhrases(alias)) {
        const match = normalized.match(re);
        if (match) {
          oxyFree = true;
          claims.push(`${alias.replace(/bp[-\s]*3/i, "benzophenone-3")} free`);
          break;
        }
      }
      if (oxyFree) break;
    }

    const harmful: string[] = [];
    const harmfulSet = new Set<string>();

    for (const ing of bannedIngredients) {
      const re = toPattern(ing);
      if (re.test(normalized)) {
        if (oxyAliases.some((a) => toPattern(a).test(ing))) {
          if (oxyFree) {
            negated.push("oxybenzone");
            continue;
          }
        }
        harmfulSet.add(ing);
      }

      if (ocrVariants[ing]) {
        for (const variant of ocrVariants[ing]) {
          const variantPattern = toPattern(variant);
          if (variantPattern.test(normalized)) {
            harmfulSet.add(ing);
          }
        }
      }
    }

    harmful.push(...Array.from(harmfulSet));
    const status: AnalysisStatus = harmful.length > 0 ? "harmful" : "safe";
    return { status, harmful, negated, claims };
  };

  const updateSelectedFile = (file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setAnalysisDetails(null);
    setOcrText("");
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  useEffect(
    () => () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    },
    [imagePreview],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      updateSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      updateSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      window.alert("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setAnalysisDetails(null);

    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    let worker: TesseractWorker | null = null;
    try {
      worker = await createWorker("eng", OEM.LSTM_ONLY, {
        logger: (m: unknown) => console.log(m),
      });

      const {
        data: { text },
      } = await worker.recognize(imageFile);

      setOcrText(text);
      const analysis = analyzeTextDetailed(text);
      setAnalysisResult(analysis.status);
      setAnalysisDetails({
        harmful: analysis.harmful,
        negated: analysis.negated,
        claims: analysis.claims,
      });
    } catch (error) {
      console.error("OCR failed", error);
      setAnalysisResult(null);
      setAnalysisDetails(null);
    } finally {
      if (worker) await worker.terminate();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-6 md:py-8">
      <div className="w-full max-w-2xl space-y-6 text-center md:space-y-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          Is Your Sunscreen Reef-Safe?
        </h1>

        <Card
          className={`border-2 border-dashed p-6 transition-colors md:p-12 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/30"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer flex-col items-center gap-3 md:gap-4"
          >
            <Upload className="h-16 w-16 text-muted-foreground md:h-20 md:w-20" />
            <div className="space-y-1 md:space-y-2">
              <p className="text-lg font-semibold text-foreground md:text-xl">
                Upload Sunscreen Ingredients
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Drag and drop or tap to upload an image
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              aria-label="Upload sunscreen ingredients photo"
            />
          </label>
          {imagePreview !== null && (
            <div className="mt-4 flex justify-center md:mt-6">
              <Image
                src={imagePreview}
                alt="Uploaded sunscreen ingredients"
                width={512}
                height={512}
                unoptimized
                className="max-h-48 rounded-xl border border-muted-foreground/20 object-contain md:max-h-64"
              />
            </div>
          )}
        </Card>

        {!imageFile && (
          <p className="px-2 text-xs text-muted-foreground sm:text-sm">
            <Camera className="inline h-4 w-4 mr-1" />
            Please upload or take a photo of your sunscreen ingredients to
            analyze{" "}
            <span className="mt-1 block">
              <strong>TIP:</strong> Make sure the ingredients list is clear and
              free of obstructions.
            </span>
          </p>
        )}

        <Button
          size="lg"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-amber-700 via-amber-400 to-amber-500 text-base font-semibold text-white shadow-lg ring-1 ring-sky-300/40 transition-all duration-300 hover:from-amber-400 hover:via-sky-500 hover:to-emerald-600 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] sm:h-14 sm:text-lg md:w-auto md:px-12 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:from-amber-700 disabled:hover:via-amber-400 disabled:hover:to-amber-500"
          onClick={handleAnalyze}
          disabled={isLoading || !imageFile}
          aria-label={isLoading ? "Analyzing photo" : "Analyze photo"}
        >
          <Camera className={`h-5 w-5 ${isLoading ? "animate-pulse" : ""}`} />
          {isLoading ? "Analyzing..." : "Analyze Photo"}
        </Button>

        {analysisResult && (
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm md:space-y-4 md:p-6">
            {analysisResult === "safe" ? (
              <div>
                <p
                  className="text-lg font-semibold text-green-600 md:text-xl"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircleIcon className="inline h-5 w-5 mr-2" />
                  Looks Reef-Safe
                </p>
                <div className="mt-2 text-xs text-foreground sm:text-sm">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>No commonly banned reef-harmful chemicals detected.</li>
                    {analysisDetails?.claims?.length ? (
                      <li>
                        Claims detected:{" "}
                        <span className="font-medium">
                          {analysisDetails.claims.join(", ")}
                        </span>
                      </li>
                    ) : null}
                    {analysisDetails?.negated?.length ? (
                      <li>
                        “Free-of” note:{" "}
                        <span className="font-medium">
                          {analysisDetails.negated.join(", ")}
                        </span>{" "}
                        mentioned as free-of.
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className="text-lg font-semibold text-red-600 md:text-xl"
                  role="alert"
                  aria-live="assertive"
                >
                  <XCircleIcon className="inline h-5 w-5 mr-2" />
                  Harmful to Reefs
                </p>
                <div className="mt-2 text-xs text-foreground sm:text-sm">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>
                      Detected potential harmful ingredients:{" "}
                      {analysisDetails?.harmful?.map((ing, idx) => {
                        const dbId = getIngredientDbId(ing);
                        return (
                          <span key={ing}>
                            {idx > 0 && ", "}
                            {dbId ? (
                              <Link
                                href={`/database/${dbId}`}
                                className="font-medium text-red-600 underline hover:text-red-700"
                              >
                                {ing}
                              </Link>
                            ) : (
                              <span className="font-medium">{ing}</span>
                            )}
                          </span>
                        );
                      })}
                    </li>
                    {analysisDetails?.claims?.length ? (
                      <li>
                        Claims detected:{" "}
                        <span className="font-medium">
                          {analysisDetails.claims.join(", ")}
                        </span>{" "}
                        (still flagged due to other ingredients).
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            )}
            <details className="text-xs text-muted-foreground sm:text-sm">
              <summary className="cursor-pointer select-none text-foreground hover:underline focus:underline">
                View recognized text
              </summary>
              {ocrText ? (
                <div className="mt-3">
                  <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    Formatted
                  </p>
                  <ul className="list-disc pl-5">
                    {splitOcrToItems(ocrText).map((item, idx) => {
                      const harmful = matchesBannedIngredient(item);
                      return (
                        <li
                          key={idx}
                          className={
                            harmful ? "text-red-600" : "text-foreground"
                          }
                        >
                          <span className="font-medium">{item}</span>
                          {harmful ? (
                            <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                              flagged
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                    Raw
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs text-muted-foreground">
                    {ocrText}
                  </pre>
                </div>
              ) : (
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs text-muted-foreground">
                  No text recognized.
                </pre>
              )}
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
