"use client";

import { useMemo, useState } from "react";
import type { Deal } from "@/lib/deals";
import { DealCard } from "./deal-card";

type Props = { deals: Deal[] };

export function DealList({ deals }: Props) {
  const [onlyShippable, setOnlyShippable] = useState(false);
  const [hideReserved, setHideReserved] = useState(true);

  const visible = useMemo(
    () => deals.filter((d) => (!onlyShippable || d.shippable) && (!hideReserved || !d.reserved)),
    [deals, onlyShippable, hideReserved],
  );

  return (
    <section aria-label="Chollos">
      <div className="mb-3 flex flex-wrap gap-2">
        <Toggle label="Solo con envío" checked={onlyShippable} onChange={setOnlyShippable} />
        <Toggle label="Ocultar reservados" checked={hideReserved} onChange={setHideReserved} />
      </div>

      {visible.length === 0 ? (
        <p className="py-8 text-center text-zinc-500">Nada con esos filtros.</p>
      ) : (
        <ul className="grid gap-3">
          {visible.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type ToggleProps = { label: string; checked: boolean; onChange: (value: boolean) => void };

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className="min-h-11 rounded-full border border-zinc-300 px-4 text-sm aria-pressed:border-teal-600 aria-pressed:bg-teal-600 aria-pressed:text-white dark:border-zinc-700"
    >
      {label}
    </button>
  );
}
