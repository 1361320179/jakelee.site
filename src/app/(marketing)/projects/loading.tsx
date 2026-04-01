export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-10 w-56 animate-pulse rounded-lg bg-muted" />
      <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded bg-muted" />
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-xl border border-border/60 bg-muted/30"
          />
        ))}
      </div>
    </div>
  );
}
