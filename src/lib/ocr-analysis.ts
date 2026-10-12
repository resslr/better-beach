import {
  bannedIngredients,
  harmfulMaterials,
  ocrVariants,
} from "./harmful-materials";

export type AnalysisStatus = "safe" | "harmful";

export interface OcrAnalysisResult {
  status: AnalysisStatus;
  harmful: string[];
  negated: string[];
  claims: string[];
}

interface IngredientTerm {
  display: string;
  presence: RegExp;
  negations: RegExp[];
}

const OPTIONAL_SEP = "[-\\s]*";
const REQUIRED_SEP = "[-\\s]+";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function resolveDisplayName(term: string): string {
  const lower = term.toLowerCase();
  const material = harmfulMaterials.find(
    (m) =>
      m.id === lower ||
      m.name.toLowerCase() === lower ||
      m.aliases?.some((alias) => alias.toLowerCase() === lower),
  );
  return material?.name ?? term;
}

function buildTerm(term: string, display: string): IngredientTerm {
  const core = term
    .toLowerCase()
    .split(/[-\s]+/)
    .filter(Boolean)
    .map(escapeRegExp)
    .join(OPTIONAL_SEP);

  const anchor = term.replace(/[-\s]/g, "").length <= 4 ? "\\b" : "";

  const negationSources = [
    `${anchor}${core}${OPTIONAL_SEP}free\\b`,
    `\\bfree${REQUIRED_SEP}of${REQUIRED_SEP}${core}${anchor}`,
    `\\bno${REQUIRED_SEP}${core}${anchor}`,
    `\\bwithout${REQUIRED_SEP}${core}${anchor}`,
    `\\b0%\\s*${core}${anchor}`,
    `\\bdoes${REQUIRED_SEP}not${REQUIRED_SEP}contain${REQUIRED_SEP}${core}${anchor}`,
  ];

  return {
    display,
    presence: new RegExp(`${anchor}${core}${anchor}`, "i"),
    negations: negationSources.map((src) => new RegExp(src, "gi")),
  };
}

const INGREDIENT_TERMS: IngredientTerm[] = (() => {
  const termToDisplay = new Map<string, string>();
  const add = (term: string, display: string) => {
    const key = term.toLowerCase();
    if (!termToDisplay.has(key)) termToDisplay.set(key, display);
  };

  for (const material of harmfulMaterials) {
    add(material.name, material.name);
    for (const alias of material.aliases ?? []) add(alias, material.name);
  }
  for (const ing of bannedIngredients) add(ing, resolveDisplayName(ing));
  for (const [ingredient, variants] of Object.entries(ocrVariants)) {
    const display = resolveDisplayName(ingredient);
    for (const variant of variants) add(variant, display);
  }

  return Array.from(termToDisplay, ([term, display]) =>
    buildTerm(term, display),
  );
})();

export function analyzeOcrText(text: string): OcrAnalysisResult {
  let remaining = text.toLowerCase();
  const claimed = new Set<string>();

  for (const term of INGREDIENT_TERMS) {
    for (const re of term.negations) {
      remaining = remaining.replace(re, (match) => {
        claimed.add(term.display);
        return " ".repeat(match.length);
      });
    }
  }

  const harmful = new Set<string>();
  for (const term of INGREDIENT_TERMS) {
    if (term.presence.test(remaining)) harmful.add(term.display);
  }

  return {
    status: harmful.size > 0 ? "harmful" : "safe",
    harmful: Array.from(harmful),
    negated: Array.from(claimed).filter((name) => !harmful.has(name)),
    claims: Array.from(claimed, (name) => `${name} free`),
  };
}
