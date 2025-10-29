export type HarmfulMaterial = {
  id: string;
  name: string;
  aliases?: string[];
  chemicalFormula: string;
  description: string;
};

export const bannedIngredients: string[] = [
  "oxybenzone",
  "octinoxate",
  "octocrylene",
  "avobenzone",
  "homosalate",
  "octisalate",
  "parabens",
  "benzophenone-3",
  "4-methylbenzylidene camphor",
  "PABA",
  "ethylhexyl methoxycinnamate",
  "butylparaben",
];

export const ocrVariants: Record<string, string[]> = {
  homosalate: [
    "hormosalate",
    "homosalale",
    "homosaiate",
    "homo salate",
    "horno salate",
  ],
  octinoxate: ["oclinoxate", "octinoxale", "oclinoxale", "octi noxate"],
  octocrylene: ["oclocrylene", "octocylene", "oclo crylene", "octocrylene"],
  avobenzone: ["avobenzone", "avo benzone", "avobenizone"],
  oxybenzone: ["oxybenione", "oxy benzone", "oxybenzone"],
  octisalate: ["octisalale", "octi salate", "oclisalate"],
  parabens: ["paradens", "para bens", "parahens"],
};

export const harmfulMaterials: HarmfulMaterial[] = [
  {
    id: "oxybenzone",
    name: "Oxybenzone",
    aliases: ["Benzophenone-3", "BP-3"],
    chemicalFormula: "C₁₄H₁₂O₃",
    description:
      "Oxybenzone is one of the most common chemical UV filters found in sunscreens. When it enters the ocean, it causes devastating harm to coral reefs at extremely low concentrations (as low as 62 parts per trillion). It triggers viral infections in coral symbionts (zooxanthellae), leading to coral bleaching as the coral expels its life-sustaining algae. Oxybenzone also causes DNA damage in coral larvae, deforms their skeletons, and prevents proper settlement and metamorphosis. Studies show it acts as an endocrine disruptor across multiple marine species, affecting reproduction and development in fish, sea urchins, and other reef organisms.",
  },
  {
    id: "octinoxate",
    name: "Octinoxate",
    aliases: ["Ethylhexyl Methoxycinnamate", "Octyl Methoxycinnamate"],
    chemicalFormula: "C₁₈H₂₆O₃",
    description:
      "Octinoxate is a highly toxic UV filter that induces rapid coral bleaching even at very low concentrations. It disrupts coral reproduction by damaging DNA and deforming coral larvae during critical developmental stages. The chemical causes corals to become enclosed in their own skeletons, preventing proper growth. Research shows octinoxate accumulates in coral tissues and triggers severe stress responses that lead to bleaching events. It also acts as an endocrine disruptor in fish and other marine animals, interfering with hormonal systems that control reproduction, growth, and immune function.",
  },
  {
    id: "octocrylene",
    name: "Octocrylene",
    aliases: ["2-Ethylhexyl 2-cyano-3,3-diphenylacrylate"],
    chemicalFormula: "C₂₄H₂₇NO₂",
    description:
      "Octocrylene is a UV absorber that accumulates heavily in coral tissues and persists in the marine environment. It causes mitochondrial dysfunction in corals, disrupting their cellular energy production and leading to bleaching. As octocrylene degrades over time, it transforms into benzophenone, a known carcinogen and potent endocrine disruptor. Studies demonstrate that octocrylene increases coral mortality rates and impairs the settlement of coral larvae, preventing reef recovery. It bioaccumulates in marine organisms, posing risks throughout the food chain and contributing to reproductive failures in fish populations.",
  },
  {
    id: "avobenzone",
    name: "Avobenzone",
    aliases: ["Butyl Methoxydibenzoylmethane", "Parsol 1789"],
    chemicalFormula: "C₂₀H₂₂O₃",
    description:
      "Avobenzone is an unstable chemical that rapidly degrades when exposed to sunlight and water, producing toxic breakdown products that harm marine ecosystems. When it decomposes in seawater, especially in the presence of chlorine from pools or coastal water treatment, it forms highly reactive compounds that damage coral tissue and DNA. These degradation products have been shown to induce oxidative stress in corals, leading to bleaching and increased disease susceptibility. Avobenzone accumulates in marine sediments where it continues to release toxic byproducts, creating long-term contamination zones that inhibit coral larval settlement and reef regeneration.",
  },
  {
    id: "homosalate",
    name: "Homosalate",
    aliases: ["Homomethyl Salicylate", "HMS"],
    chemicalFormula: "C₁₆H₂₂O₃",
    description:
      "Homosalate is a lipophilic chemical that readily accumulates in the fatty tissues of marine organisms, concentrating as it moves up the food chain. In corals, it disrupts cellular membranes and interferes with the symbiotic relationship between coral polyps and their zooxanthellae algae, leading to bleaching. Research shows homosalate acts as a potent endocrine disruptor, mimicking hormones and interfering with reproductive systems in fish, sea turtles, and other marine wildlife. It has been detected in coral reef ecosystems at concentrations that cause developmental abnormalities in coral larvae and impair their ability to attach to substrates, preventing new coral growth.",
  },
  {
    id: "octisalate",
    name: "Octisalate",
    aliases: ["Ethylhexyl Salicylate", "2-Ethylhexyl Salicylate"],
    chemicalFormula: "C₁₅H₂₂O₃",
    description:
      "Octisalate is a UVB-absorbing chemical that bioaccumulates in coral tissues and marine organisms. Studies reveal it disrupts the photosynthetic processes of zooxanthellae, the symbiotic algae that provide corals with up to 90% of their energy needs. This disruption leads to coral bleaching and starvation. Octisalate also interferes with hormone regulation in marine animals, particularly affecting reproductive development in fish and invertebrates. It has been shown to accumulate in reef sediments where it continues to leach into the water column, creating persistent contamination that impairs coral larval recruitment and reduces reef biodiversity.",
  },
  {
    id: "parabens",
    name: "Parabens",
    aliases: ["Butylparaben", "Methylparaben", "Propylparaben"],
    chemicalFormula: "C₁₁H₁₄O₃ (Butylparaben)",
    description:
      "Parabens are preservatives that persist in ocean water and accumulate in coral reef ecosystems. They cause coral bleaching by disrupting the delicate symbiosis between corals and their photosynthetic zooxanthellae. Parabens are potent endocrine disruptors that mimic estrogen in marine organisms, causing reproductive failures, developmental abnormalities, and decreased fertility in fish, crustaceans, and mollusks. Research shows parabens damage coral DNA, impair larval development, and reduce coral growth rates. They also weaken coral immune systems, making reefs more susceptible to disease outbreaks and reducing their resilience to environmental stressors like warming ocean temperatures.",
  },
  {
    id: "4-methylbenzylidene-camphor",
    name: "4-Methylbenzylidene Camphor",
    aliases: ["4-MBC", "Enzacamene"],
    chemicalFormula: "C₁₈H₂₂O",
    description:
      "4-Methylbenzylidene Camphor (4-MBC) is an extremely potent endocrine disruptor and coral toxin, which is why it has been banned in many countries. It causes rapid coral bleaching at very low concentrations by disrupting coral metabolism and triggering the expulsion of zooxanthellae. 4-MBC severely damages coral reproductive systems, causing feminization of male corals and reproductive failure. In fish and other marine animals, it interferes with thyroid and sex hormone function, leading to developmental abnormalities, altered behavior, and population declines. Studies show 4-MBC persists in marine environments, accumulating in sediments and continuing to release toxins that prevent coral recovery.",
  },
  {
    id: "paba",
    name: "PABA",
    aliases: ["Para-aminobenzoic Acid", "4-Aminobenzoic Acid"],
    chemicalFormula: "C₇H₇NO₂",
    description:
      "PABA, while less commonly used today, still poses significant risks to coral reefs when it enters marine environments. It disrupts coral cellular processes and can interfere with the photosynthetic activity of zooxanthellae, leading to bleaching. PABA and its derivatives have been shown to cause oxidative stress in coral tissues, damaging cellular structures and DNA. The chemical accumulates in marine sediments and organisms, where it can persist for extended periods. Studies indicate PABA affects the settlement and metamorphosis of coral larvae, reducing successful reef recruitment. It also demonstrates endocrine-disrupting properties in fish, affecting reproductive hormones and developmental processes.",
  },
];
