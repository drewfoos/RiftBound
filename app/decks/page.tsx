// app/decks/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DeckTier,
  getDecksByTier,
  getAllDecks,
  metaDescription,
  tierExplanations,
} from "@/lib/decks";
import {
  getAllRiftboundProductsWithPrices,
  TcgProductWithPrice,
} from "@/lib/tcg";

const orderedTiers: DeckTier[] = ["S", "A", "B", "C"];

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").trim();
}

function findDeckCoverProduct(
  deck: { name: string; coverImageHint?: string },
  products: TcgProductWithPrice[],
): TcgProductWithPrice | null {
  const targetRaw = deck.coverImageHint ?? deck.name;
  const target = normalizeName(targetRaw);

  return (
    products.find((p) => normalizeName(p.cleanName).includes(target)) ??
    products.find((p) => normalizeName(p.name).includes(target)) ??
    null
  );
}

export default async function DecksPage() {
  const allDecks = getAllDecks();
  const products = await getAllRiftboundProductsWithPrices();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 space-y-8">
        {/* Header */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Riftbound • Meta Tier List
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Riftbound Deck Tier List
          </h1>
          <p className="text-sm text-slate-600 md:text-[0.95rem]">
            {metaDescription}
          </p>
        </section>

        {/* Quick All Decks section */}
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900">All Decks</h2>
          <p className="text-xs text-slate-600">
            A quick overview of every deck currently ranked in the meta.
          </p>
          <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 font-semibold text-slate-700">
                    Deck
                  </th>
                  <th className="px-3 py-2 font-semibold text-slate-700">
                    Tier
                  </th>
                  <th className="px-3 py-2 font-semibold text-slate-700">
                    Archetype
                  </th>
                  <th className="px-3 py-2 font-semibold text-slate-700">
                    Champions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allDecks.map((deck) => (
                  <tr
                    key={deck.slug}
                    className="border-t border-slate-200 align-middle"
                  >
                    <td className="px-3 py-1.5">
                      <Link
                        href={`/decks/${deck.slug}`}
                        className="font-medium text-slate-900 hover:text-emerald-700 hover:underline"
                      >
                        {deck.name}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5">
                      <Badge
                        className={
                          deck.tier === "S"
                            ? "bg-emerald-600 text-white"
                            : deck.tier === "A"
                            ? "bg-sky-600 text-white"
                            : deck.tier === "B"
                            ? "bg-amber-500 text-white"
                            : "bg-slate-500 text-white"
                        }
                      >
                        {deck.tier}
                      </Badge>
                    </td>
                    <td className="px-3 py-1.5 text-slate-700">
                      {deck.archetype}
                    </td>
                    <td className="px-3 py-1.5 text-slate-700">
                      {deck.champions.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tier sections */}
        <section className="space-y-8">
          {orderedTiers.map((tier) => {
            const tierDecks = getDecksByTier(tier);
            if (tierDecks.length === 0) return null;

            return (
              <div key={tier} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      tier === "S"
                        ? "bg-emerald-600 text-white"
                        : tier === "A"
                        ? "bg-sky-600 text-white"
                        : tier === "B"
                        ? "bg-amber-500 text-white"
                        : "bg-slate-500 text-white"
                    }
                  >
                    {tier} Tier
                  </Badge>
                  <span className="text-sm font-medium text-slate-800">
                    {tier === "S"
                      ? "Decks to beat"
                      : tier === "A"
                      ? "Strong meta contenders"
                      : tier === "B"
                      ? "Viable, but not top"
                      : "Fun / experimental options"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 max-w-3xl">
                  {tierExplanations[tier]}
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tierDecks.map((deck) => {
                    const coverProduct = findDeckCoverProduct(deck, products);
                    const imgSrc = coverProduct?.imageUrl ?? null;

                    return (
                      <Card
                        key={deck.slug}
                        className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm"
                      >
                        {/* Cover image */}
                        {imgSrc && (
                          <div className="relative h-40 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                            <Image
                              src={imgSrc}
                              alt={deck.name}
                              fill
                              className="object-contain"
                              sizes="(min-width: 1024px) 250px, 100vw"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                          </div>
                        )}

                        <CardHeader className="space-y-1 pb-2">
                          <CardTitle className="text-sm font-semibold text-slate-900">
                            <Link
                              href={`/decks/${deck.slug}`}
                              className="hover:text-emerald-700 hover:underline"
                            >
                              {deck.name}
                            </Link>
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-600">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                              {deck.archetype}
                            </span>
                            {deck.champions.length > 0 && (
                              <span>
                                Champions: {deck.champions.join(", ")}
                              </span>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col gap-2 pt-1">
                          <p className="text-xs text-slate-700">
                            {deck.shortDescription}
                          </p>
                          <p className="mt-auto text-[0.7rem] text-slate-500">
                            Last updated:{" "}
                            {new Date(deck.lastUpdated).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
