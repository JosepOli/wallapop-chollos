import Image from "next/image";
import type { Deal } from "@/lib/deals";

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function DealCard({ deal }: { deal: Deal }) {
  const isDeal = deal.discountPct > 0;

  return (
    <a
      href={deal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-2 active:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        {deal.imageUrl && (
          <Image src={deal.imageUrl} alt="" fill sizes="96px" className="object-cover" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <h2 className="line-clamp-2 text-sm font-medium">{deal.title}</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{euros.format(deal.price)}</span>
          {isDeal && (
            <span className="rounded-md bg-teal-100 px-1.5 text-xs font-semibold text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              −{deal.discountPct}%
            </span>
          )}
        </div>
        <p className="truncate text-xs text-zinc-500">
          {deal.city}
          {deal.shippable && " · envío"}
          {deal.reserved && " · reservado"}
        </p>
      </div>
    </a>
  );
}
