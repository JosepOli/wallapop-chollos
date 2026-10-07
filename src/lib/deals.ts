export type Listing = {
  id: string;
  title: string;
  price: number;
  currency: string;
  city: string;
  imageUrl: string | null;
  url: string;
  reserved: boolean;
  shippable: boolean;
  createdAt: number;
};

export type Deal = Listing & {
  /** Porcentaje por debajo de la mediana de la búsqueda (negativo si está por encima). */
  discountPct: number;
};

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Un chollo es un anuncio cuyo precio queda por debajo de la mediana de su propia búsqueda.
 * Se ignoran precios ridículos (< 10 % de la mediana): suelen ser cebos o accesorios sueltos.
 */
export function rankDeals(listings: Listing[]): { deals: Deal[]; medianPrice: number } {
  const priced = listings.filter((l) => l.price > 0);
  const medianPrice = median(priced.map((l) => l.price));
  if (medianPrice === 0) return { deals: [], medianPrice };

  const deals = priced
    .filter((l) => l.price >= medianPrice * 0.1)
    .map((l) => ({ ...l, discountPct: Math.round((1 - l.price / medianPrice) * 100) }))
    .sort((a, b) => b.discountPct - a.discountPct);

  return { deals, medianPrice };
}
