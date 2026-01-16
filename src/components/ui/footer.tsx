import { CodeBracketIcon as Github } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="hidden border-t border-border bg-card text-muted-foreground md:block">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🪸</div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              BetterBeach
            </h3>
            <p className="text-xs text-muted-foreground">
              Reef-safe sunscreen checker
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {/* instead of hardcoding the year use the date function*/}
          <span className="text-sm">
            © {new Date().getFullYear()} BetterBeach
          </span>
          <a
            href="https://github.com/resslr/betterbeach"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pl-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
