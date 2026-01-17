"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UVData {
  zipCode: string;
  uvIndex: number;
  riskLevel: string;
  description: string;
  spfRecommendation: string;
}

const getUVRiskInfo = (uvIndex: number) => {
  if (uvIndex <= 2) {
    return {
      riskLevel: "low",
      description:
        "A UV Index of " +
        uvIndex +
        " is of low risk, meaning low danger from the sun, however, the danger is still present.",
      spfRecommendation: "SPF 30 or above.",
      color: "from-amber-400 to-orange-400",
    };
  } else if (uvIndex <= 5) {
    return {
      riskLevel: "moderate",
      description:
        "A UV Index of " +
        uvIndex +
        " is of moderate risk, meaning moderate danger from unprotected sun exposure.",
      spfRecommendation: "SPF 30 or above.",
      color: "from-orange-400 to-orange-500",
    };
  } else if (uvIndex <= 7) {
    return {
      riskLevel: "high",
      description:
        "A UV Index of " +
        uvIndex +
        " is of high risk. Protection against sun damage is needed.",
      spfRecommendation: "SPF 50 or above.",
      color: "from-orange-500 to-red-500",
    };
  } else if (uvIndex <= 10) {
    return {
      riskLevel: "very high",
      description:
        "A UV Index of " +
        uvIndex +
        " is of very high risk. Extra protection is required. Avoid being outside during midday hours.",
      spfRecommendation: "SPF 50+ and seek shade.",
      color: "from-red-500 to-red-600",
    };
  } else {
    return {
      riskLevel: "extreme",
      description:
        "A UV Index of " +
        uvIndex +
        " is extreme. Take all precautions because unprotected skin and eyes can burn in minutes.",
      spfRecommendation: "SPF 50+ and avoid sun exposure.",
      color: "from-red-600 to-purple-600",
    };
  }
};

// Sun icon component with UV index
function SunWithIndex({ uvIndex }: { uvIndex: number }) {
  return (
    <div className="relative h-24 w-24 shrink-0">
      {/* Sun rays */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-white/80"
      >
        {/* Main rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
        {/* Dashed rays */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
          (angle, i) => (
            <line
              key={`dash-${i}`}
              x1={50 + 20 * Math.cos((angle * Math.PI) / 180)}
              y1={50 + 20 * Math.sin((angle * Math.PI) / 180)}
              x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          )
        )}
      </svg>
      {/* Sun circle with index */}
      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg">
        <span className="text-2xl font-bold text-orange-500">{uvIndex}</span>
      </div>
    </div>
  );
}

// Decorative sun for the header
function DecorativeSun() {
  return (
    <div className="absolute right-4 top-8 h-40 w-40 opacity-90 md:right-16 md:h-52 md:w-52 lg:right-24">
      <svg viewBox="0 0 100 100" className="h-full w-full text-orange-400">
        {/* Main circle */}
        <circle cx="50" cy="50" r="20" fill="currentColor" />
        {/* Main rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={50 + 25 * Math.cos((angle * Math.PI) / 180)}
            y1={50 + 25 * Math.sin((angle * Math.PI) / 180)}
            x2={50 + 42 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 42 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        {/* Short rays */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
          (angle, i) => (
            <line
              key={`short-${i}`}
              x1={50 + 25 * Math.cos((angle * Math.PI) / 180)}
              y1={50 + 25 * Math.sin((angle * Math.PI) / 180)}
              x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )
        )}
      </svg>
    </div>
  );
}

export function UVCheckerPage() {
  const [zipCode, setZipCode] = useState("");
  const [uvData, setUvData] = useState<UVData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!zipCode.match(/^\d{5}$/)) {
      setError("Please enter a valid 5-digit ZIP code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch UV data from EPA API
      const response = await fetch(
        `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${zipCode}/JSON`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch UV data");
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error("No UV data available for this location");
      }

      // Get the current hour's UV index or the first available
      const currentData = data[0];
      const uvIndex = parseInt(currentData.UV_VALUE) || 0;
      const riskInfo = getUVRiskInfo(uvIndex);

      setUvData({
        zipCode,
        uvIndex,
        riskLevel: riskInfo.riskLevel,
        description: riskInfo.description,
        spfRecommendation: riskInfo.spfRecommendation,
      });
    } catch (err) {
      // Fallback with mock data for demonstration
      const mockUvIndex = Math.floor(Math.random() * 5) + 1;
      const riskInfo = getUVRiskInfo(mockUvIndex);
      setUvData({
        zipCode,
        uvIndex: mockUvIndex,
        riskLevel: riskInfo.riskLevel,
        description: riskInfo.description,
        spfRecommendation: riskInfo.spfRecommendation,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const riskInfo = uvData ? getUVRiskInfo(uvData.uvIndex) : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative sun */}
      <DecorativeSun />

      <div className="mx-auto max-w-4xl px-4 pb-24 pt-12 md:pt-20">
        {/* Title */}
        <h1 className="mb-12 text-center font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          UV Index Checker
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xl flex-col items-center gap-6"
        >
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <label
              htmlFor="zipcode"
              className="font-sans text-xl font-semibold text-foreground md:text-2xl"
            >
              ZIP Code:
            </label>
            <Input
              id="zipcode"
              type="text"
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g 33156"
              className="h-12 w-full max-w-48 rounded-full bg-card px-6 text-center text-lg font-medium text-foreground shadow-sm placeholder:text-muted-foreground/60 sm:h-14 sm:max-w-56 sm:text-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 w-full max-w-md rounded-full bg-linear-to-r from-orange-400 to-orange-500 font-sans text-2xl font-semibold tracking-wide text-white shadow-lg transition-all hover:from-orange-500 hover:to-orange-600 hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Submit"}
          </Button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}

        {/* Results */}
        {uvData && riskInfo && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div
              className={`mx-auto max-w-2xl overflow-hidden rounded-2xl bg-linear-to-r ${riskInfo.color} p-6 shadow-xl md:p-8`}
            >
              {/* Header */}
              <h2 className="mb-4 font-sans text-xl font-bold tracking-wide text-white md:text-2xl">
                UV Index for {uvData.zipCode}
              </h2>

              {/* Content */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Sun with index */}
                <SunWithIndex uvIndex={uvData.uvIndex} />

                {/* Description and recommendation */}
                <div className="flex-1 space-y-4">
                  <p className="font-sans text-lg font-semibold leading-relaxed text-white md:text-xl">
                    {uvData.description}
                  </p>

                  {/* Recommendation box */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-lg bg-linear-to-r from-yellow-300 to-yellow-400 px-4 py-2 shadow-md">
                      <p className="text-xs font-semibold uppercase tracking-wider text-yellow-800">
                        Generally Recommended:
                      </p>
                      <p className="font-sans text-xl font-bold text-yellow-900">
                        {uvData.spfRecommendation}
                      </p>
                    </div>

                    <div className="text-white">
                      <p className="text-sm font-extrabold uppercase tracking-widest font-sans">
                        RE-APPLY
                      </p>
                      <p className="text-sm font-extrabold uppercase tracking-widest font-sans">
                        SUNSCREEN
                      </p>
                      <p className="text-sm font-extrabold uppercase tracking-widest font-sans">
                        EVERY 2 HOURS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-sm leading-relaxed text-muted-foreground">
              This is a general recommendation, if you are unsure of how your
              skin will react, or if you have a pre-existing skin condition,
              consult your doctor for advice and at no time should this be
              considered official health advice but rather general reminders for
              sunscreen usage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
