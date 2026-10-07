"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = { initialQuery: string; initialMaxPrice: string };

const DEBOUNCE_MS = 600;

export function SearchForm({ initialQuery, initialMaxPrice }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [isPending, startTransition] = useTransition();

  function search(q: string, max: string) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (max) params.set("max", max);
    startTransition(() => router.push(`/?${params}`));
  }

  // Búsqueda automática al dejar de escribir. El cleanup cancela el temporizador anterior
  // en cada pulsación, así solo se lanza una petición cuando el usuario se para.
  useEffect(() => {
    if (query === initialQuery && maxPrice === initialMaxPrice) return;
    const timer = setTimeout(() => search(query, maxPrice), DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, maxPrice]);

  return (
    <form
      role="search"
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isPending) search(query, maxPrice);
      }}
    >
      <label className="sr-only" htmlFor="q">Qué buscas</label>
      <input
        id="q"
        type="search"
        enterKeyHint="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="rtx 3080, bici carretera…"
        className="min-h-12 min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-3 text-base dark:border-zinc-700 dark:bg-zinc-900"
      />
      <label className="sr-only" htmlFor="max">Precio máximo</label>
      <input
        id="max"
        type="number"
        inputMode="numeric"
        min={0}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Máx €"
        className="min-h-12 w-24 rounded-xl border border-zinc-300 bg-white px-3 text-base dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        type="submit"
        disabled={isPending}
        className="min-h-12 min-w-12 rounded-xl bg-teal-600 px-4 font-semibold text-white disabled:opacity-60"
      >
        {isPending ? "…" : "Buscar"}
      </button>
    </form>
  );
}
