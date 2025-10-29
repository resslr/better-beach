export default function Offline() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="text-6xl">🌊</div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          You&apos;re Offline
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          You need an internet connection to scan sunscreen ingredients. Please
          check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
