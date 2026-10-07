export default function Loading() {
  return (
    <main className="mx-auto max-w-xl px-4 pt-32" aria-busy="true" aria-label="Cargando">
      <ul className="grid gap-3">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="h-28 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </ul>
    </main>
  );
}
