import { DealList } from "@/components/deal-list";
import { SearchForm } from "@/components/search-form";
import { rankDeals } from "@/lib/deals";
import { searchListings } from "@/lib/wallapop";

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

type PageProps = { searchParams: Promise<{ q?: string; max?: string }> };

export default async function Home({ searchParams }: PageProps) {
  const { q = "", max = "" } = await searchParams;

  return (
    <main className="mx-auto min-h-dvh max-w-xl px-4 pb-8">
      <header className="sticky top-0 z-10 -mx-4 bg-zinc-50/95 px-4 pb-3 pt-4 backdrop-blur dark:bg-zinc-950/95">
        <h1 className="mb-3 text-xl font-bold">Chollos de Wallapop</h1>
        <SearchForm initialQuery={q} initialMaxPrice={max} />
      </header>

      {q ? <Results query={q} maxPrice={Number(max) || undefined} /> : <Intro />}
    </main>
  );
}

async function Results({ query, maxPrice }: { query: string; maxPrice?: number }) {
  try {
    const listings = await searchListings({ query, maxPrice });
    const { deals, medianPrice } = rankDeals(listings);

    if (deals.length === 0) {
      return <p className="py-8 text-center text-zinc-500">Sin anuncios para «{query}».</p>;
    }

    return (
      <>
        <p className="mb-3 text-sm text-zinc-500">
          {deals.length} anuncios · mediana {euros.format(medianPrice)}. El % es lo que queda por debajo.
        </p>
        <DealList deals={deals} />
      </>
    );
  } catch {
    return (
      <p role="alert" className="py-8 text-center text-red-600">
        No he podido consultar Wallapop. Prueba otra vez en un momento.
      </p>
    );
  }
}

function Intro() {
  return (
    <p className="py-8 text-zinc-500">
      Busca algo y ordeno los anuncios más recientes por lo baratos que están respecto a la mediana de esa misma búsqueda.
    </p>
  );
}
