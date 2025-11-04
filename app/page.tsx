// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getOriginsProductsWithPrices } from "@/lib/tcg";
import type { TcgProductWithPrice } from "@/lib/tcg";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const allProducts: TcgProductWithPrice[] = await getOriginsProductsWithPrices();

  const featured = [...allProducts]
    .sort(
      (a, b) =>
        new Date(b.modifiedOn).getTime() - new Date(a.modifiedOn).getTime(),
    )
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="relative h-[220px] md:h-[280px] lg:h-[400px] w-full">
          <Image
            src="/Miss_Fortune_Banner.png"
            alt="Miss Fortune holding Riftbound cards with treasure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-emerald-950/95 via-emerald-900/70 to-transparent" />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl items-center px-4">
              <div className="max-w-xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Riftbound • League of Legends TCG
                </p>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  Track Riftbound Products & Prices
                </h1>
                <p className="text-xs text-emerald-100 md:text-sm">
                  Browse sealed products, check live market prices from
                  TCGplayer, and prepare your collection for Riftbound: Origins
                  and future sets.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-slate-900 hover:bg-white"
                  >
                    <Link href="/products">View Products</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-emerald-300 text-white bg-transparent hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/decks">Explore Decks</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Featured Origins Products</h2>
          <Link
            href="/products"
            className="text-xs font-medium text-sky-700 hover:underline"
          >
            View all products →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
            No products available yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured.map((p) => (
              <Link
                key={p.productId}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex"
              >
                <Card className="flex h-full w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardHeader className="space-y-1 pb-2 px-3 pt-3">
                    <CardTitle className="line-clamp-2 text-[0.8rem] font-semibold text-slate-900 sm:text-sm">
                      {p.name}
                    </CardTitle>
                  </CardHeader>

                  <div className="px-3 pb-0">
                    <div className="relative w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                      {p.imageUrl ? (
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="(min-width: 1024px) 240px, (min-width: 768px) 33vw, 50vw"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center text-xs text-slate-500">
                          No image
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className="mt-2 flex flex-1 flex-col justify-between gap-2 px-3 pb-3 pt-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[0.7rem] text-slate-500">
                        Market
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatUSD(p.price?.marketPrice) ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[0.65rem] text-slate-600">
                      <span className="truncate">ID: {p.productId}</span>
                      <Badge
                        variant="outline"
                        className="px-1 py-0 text-[0.6rem]"
                      >
                        Origins
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT / INFO */}
      <section className="bg-slate-100 py-10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-3 text-xl font-semibold">What this site does</h2>
          <p className="text-sm text-slate-700 md:text-base">
            This is a companion site for Riftbound: League of Legends Trading
            Card Game. It surfaces sealed products and pricing from TCGplayer
            and is designed to integrate with Riot&apos;s official Riftbound
            API once a production key is approved.
          </p>
          <div className="mt-4 flex justify-center gap-3 text-xs flex-wrap">
            <Badge variant="secondary">Origins</Badge>
            <Badge variant="secondary">Proving Grounds</Badge>
            <Badge variant="secondary">Worlds 2025</Badge>
            <Badge variant="secondary">Spiritforged</Badge>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        Riftbound and League of Legends are trademarks of Riot Games, Inc.
        This site is not endorsed by or affiliated with Riot Games or TCGplayer.
      </footer>
    </main>
  );
}

function formatUSD(value: number | null | undefined): string | null {
  if (value == null || Number.isNaN(value)) return null;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}
