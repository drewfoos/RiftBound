// app/decks/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getDeckBySlug,
  tierExplanations,
  DeckTier,
  DeckCard,
} from "@/lib/decks";
import {
  getAllRiftboundProductsWithPrices,
  TcgProductWithPrice,
} from "@/lib/tcg";

interface DeckPageProps {
  params: Promise<{ slug: string }>;
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").trim();
}

function findProductForCard(
  card: DeckCard,
  products: TcgProductWithPrice[],
): TcgProductWithPrice | null {
  const target = normalizeName(card.name);

  return (
    products.find((p) => normalizeName(p.cleanName) === target) ??
    products.find((p) => normalizeName(p.name) === target) ??
    products.find((p) => normalizeName(p.cleanName).includes(target)) ??
    products.find((p) => normalizeName(p.name).includes(target)) ??
    null
  );
}

function formatPrice(value: number | null | undefined): string | null {
  if (value == null) return null;
  return `$${value.toFixed(2)}`;
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) {
    return notFound();
  }

  const products = await getAllRiftboundProductsWithPrices();
  const tierLabel = `${deck.tier} Tier`;

  const mainCount =
    deck.cards?.reduce((sum, card) => sum + card.quantity, 0) ?? 0;
  const sideCount =
    deck.sideboard?.reduce((sum, card) => sum + card.quantity, 0) ?? 0;

  const renderCardRow = (card: DeckCard, idx: number) => {
    const product = findProductForCard(card, products);
    const imgSrc = product?.imageUrl ?? null;
    const price =
      formatPrice(product?.price?.marketPrice) ??
      formatPrice(product?.price?.midPrice);

    return (
      <div
        key={`${card.name}-${idx}`}
        className="flex items-center justify-between gap-3 border-t border-slate-200 px-3 py-2 text-xs md:text-sm"
      >
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          {imgSrc && (
            <div className="relative h-12 w-8 overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <Image
                src={imgSrc}
                alt={card.name}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
          )}

          {/* Name + TCG link */}
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">{card.name}</span>
            {product && (
              <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-500">
                {price && <span>Market: {price}</span>}
                <span className="hidden sm:inline">•</span>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  View on TCGplayer
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Qty pill */}
        <div className="flex items-center gap-1">
          <span className="text-[0.7rem] uppercase tracking-[0.15em] text-slate-500">
            Qty
          </span>
          <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full bg-slate-900/90 px-2 text-xs font-semibold text-white">
            {card.quantity}
          </span>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-10 space-y-6">
        {/* Breadcrumb + title row */}
        <div className="space-y-3">
          <Link
            href="/decks"
            className="inline-flex items-center text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            ← Back to tier list
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {deck.name}
                </h1>
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
                  {tierLabel}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">
                Archetype:{" "}
                <span className="font-semibold text-slate-900">
                  {deck.archetype}
                </span>
              </p>
              {deck.champions.length > 0 && (
                <p className="text-xs text-slate-600">
                  Key Champions:{" "}
                  <span className="font-medium text-slate-900">
                    {deck.champions.join(", ")}
                  </span>
                </p>
              )}
              <p className="text-[0.7rem] text-slate-500">
                Last updated:{" "}
                {new Date(deck.lastUpdated).toLocaleDateString()}
              </p>
            </div>

            {/* Summary pill block */}
            <div className="flex flex-col items-end gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-700 shadow-sm">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Deck Summary
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span>
                  Main:{" "}
                  <span className="font-semibold text-slate-900">
                    {mainCount || "—"}
                  </span>
                  {"  "}cards
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  Sideboard:{" "}
                  <span className="font-semibold text-slate-900">
                    {sideCount || "—"}
                  </span>
                  {"  "}cards
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content card */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-6 pt-5 text-sm text-slate-700">
            {/* Why this tier */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold text-slate-900">
                Why this deck is in {tierLabel}
              </h2>
              <p className="text-sm text-slate-700">
                {tierExplanations[deck.tier as DeckTier]}
              </p>
            </section>

            {/* Strengths / Weaknesses */}
            <section className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-slate-900">
                  Strengths
                </h3>
                <ul className="list-disc space-y-1 pl-4 text-sm">
                  {deck.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-slate-900">
                  Weaknesses
                </h3>
                <ul className="list-disc space-y-1 pl-4 text-sm">
                  {deck.weaknesses.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Main Deck */}
            {deck.cards && deck.cards.length > 0 && (
              <section className="space-y-2 border-t border-slate-200 pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Main Deck
                  </h3>
                  <span className="text-[0.7rem] text-slate-500">
                    {mainCount} cards
                  </span>
                </div>
                <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                  {/* Header row */}
                  <div className="flex justify-between gap-3 bg-slate-100 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    <span>Card</span>
                    <span>Quantity</span>
                  </div>
                  {/* Rows */}
                  <div>
                    {deck.cards.map((card, idx) => renderCardRow(card, idx))}
                  </div>
                </div>
              </section>
            )}

            {/* Sideboard */}
            {deck.sideboard && deck.sideboard.length > 0 && (
              <section className="space-y-2 border-t border-slate-200 pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Sideboard
                  </h3>
                  <span className="text-[0.7rem] text-slate-500">
                    {sideCount} cards
                  </span>
                </div>
                <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                  <div className="flex justify-between gap-3 bg-slate-100 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    <span>Card</span>
                    <span>Quantity</span>
                  </div>
                  <div>
                    {deck.sideboard.map((card, idx) =>
                      renderCardRow(card, idx),
                    )}
                  </div>
                </div>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
