import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20 text-center">
      <div className="space-y-4">
        <div className="text-5xl">🪸</div>
        <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
        <p className="text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="rounded-full px-6 py-2 text-sm font-medium bg-primary text-primary-foreground"
          >
            Go home
          </Link>
          <Link
            href="/database"
            className="rounded-full px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Browse database
          </Link>
        </div>
      </div>
    </main>
  );
}
