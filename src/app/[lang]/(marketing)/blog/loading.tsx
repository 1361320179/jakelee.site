export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="mt-4 h-6 w-full max-w-lg animate-pulse rounded bg-muted" />
      <div className="mt-10 space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border border-border/60 bg-muted/30"
          />
        ))}
      </div>
    </div>
  );
}
