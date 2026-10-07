import { describe, expect, it } from "vitest";
import { median, rankDeals, type Listing } from "./deals";

const listing = (id: string, price: number): Listing => ({
  id,
  title: id,
  price,
  currency: "EUR",
  city: "Olivella",
  imageUrl: null,
  url: `https://es.wallapop.com/item/${id}`,
  reserved: false,
  shippable: true,
  createdAt: 0,
});

describe("median", () => {
  it("devuelve el valor central con un número impar de precios", () => {
    expect(median([300, 100, 200])).toBe(200);
  });

  it("promedia los dos centrales con un número par", () => {
    expect(median([100, 200, 300, 400])).toBe(250);
  });

  it("devuelve 0 sin precios", () => {
    expect(median([])).toBe(0);
  });
});

describe("rankDeals", () => {
  it("ordena de mayor a menor descuento respecto a la mediana", () => {
    const { deals, medianPrice } = rankDeals([listing("a", 400), listing("b", 200), listing("c", 300)]);
    expect(medianPrice).toBe(300);
    expect(deals.map((d) => d.id)).toEqual(["b", "c", "a"]);
    expect(deals[0].discountPct).toBe(33);
  });

  it("descarta precios cebo por debajo del 10 % de la mediana y los de 0 €", () => {
    const { deals } = rankDeals([listing("cebo", 1), listing("gratis", 0), listing("a", 500), listing("b", 600)]);
    expect(deals.map((d) => d.id)).not.toContain("cebo");
    expect(deals.map((d) => d.id)).not.toContain("gratis");
  });
});
