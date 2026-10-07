import "server-only";
import type { Listing } from "./deals";

// API pública no documentada que usa la web de Wallapop. Puede cambiar sin aviso.
const SEARCH_URL = "https://api.wallapop.com/api/v3/search";

// Olivella (Garraf) como punto de búsqueda por defecto.
const DEFAULT_LOCATION = { latitude: 41.3264, longitude: 1.7069 };

type ApiItem = {
  id: string;
  title: string;
  price?: { amount: number; currency: string };
  images?: { urls: { small?: string; medium?: string } }[];
  reserved?: { flag: boolean };
  shipping?: { item_is_shippable?: boolean; user_allows_shipping?: boolean };
  location?: { city?: string };
  web_slug: string;
  created_at: number;
};

type ApiResponse = { data?: { section?: { payload?: { items?: ApiItem[] } } } };

export type SearchParams = { query: string; maxPrice?: number };

export async function searchListings({ query, maxPrice }: SearchParams): Promise<Listing[]> {
  const params = new URLSearchParams({
    keywords: query,
    source: "search_box",
    order_by: "newest",
    latitude: String(DEFAULT_LOCATION.latitude),
    longitude: String(DEFAULT_LOCATION.longitude),
  });
  if (maxPrice) params.set("max_sale_price", String(maxPrice));

  const res = await fetch(`${SEARCH_URL}?${params}`, {
    headers: { "X-DeviceOS": "0", "Accept-Language": "es-ES" },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Wallapop respondió ${res.status}`);

  const body = (await res.json()) as ApiResponse;
  const items = body.data?.section?.payload?.items ?? [];
  return items.map(toListing);
}

function toListing(item: ApiItem): Listing {
  return {
    id: item.id,
    title: item.title,
    price: item.price?.amount ?? 0,
    currency: item.price?.currency ?? "EUR",
    city: item.location?.city ?? "",
    imageUrl: item.images?.[0]?.urls.medium ?? item.images?.[0]?.urls.small ?? null,
    url: `https://es.wallapop.com/item/${item.web_slug}`,
    reserved: item.reserved?.flag ?? false,
    shippable: Boolean(item.shipping?.item_is_shippable && item.shipping?.user_allows_shipping),
    createdAt: item.created_at,
  };
}
