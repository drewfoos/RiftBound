"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { TcgProductWithPrice } from "@/lib/tcg";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 24;

interface ProductsClientProps {
  allProducts: TcgProductWithPrice[];
  initialPage: number;
}

export function ProductsClient({
  allProducts,
  initialPage,
}: ProductsClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(initialPage);

  const latestModified =
    allProducts.length > 0
      ? new Date(
          allProducts
            .map((p) => new Date(p.modifiedOn).getTime())
            .sort((a, b) => b - a)[0],
        ).toLocaleDateString()
      : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProducts;

    return allProducts.filter((p) => {
      const name = p.name.toLowerCase();
      const clean = p.cleanName.toLowerCase();
      const type = (p.price?.subTypeName ?? "").toLowerCase();
      const id = String(p.productId);
      return (
        name.includes(q) ||
        clean.includes(q) ||
        type.includes(q) ||
        id.includes(q)
      );
    });
  }, [allProducts, query]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = filtered.slice(start, start + PAGE_SIZE);

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        {/* Header */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Riftbound • TCG Products
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Origins Product Catalog
            </h1>
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge
                variant="secondary"
                className="bg-slate-200 text-slate-900"
              >
                Items: {totalItems}
              </Badge>
              {latestModified && (
                <Badge variant="outline">Updated: {latestModified}</Badge>
              )}
              <Badge variant="outline">Source: TCGplayer / TCGCSV</Badge>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <p className="font-medium">Buy on TCGplayer</p>
            <p className="text-slate-700">
              This page lists products only. All purchases happen on TCGplayer.
            </p>
            <Button asChild size="sm" className="mt-1">
              <Link
                href="https://www.tcgplayer.com/search/trading-card-game/product?productLineName=riftbound-league-of-legends-trading-card-game"
                target="_blank"
              >
                View all on TCGplayer →
              </Link>
            </Button>
          </div>
        </section>

        {/* Toolbar */}
        <section className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Input
              className="h-9 text-sm"
              placeholder="Search by name, type, or ID"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <p className="text-xs text-slate-500">
            Results update instantly as you type.
          </p>
        </section>

        {/* Grid + pagination */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2 text-sm text-slate-700">
            <span>
              Showing{" "}
              <strong>
                {totalItems === 0 ? 0 : start + 1}–
                {Math.min(start + PAGE_SIZE, totalItems)}
              </strong>{" "}
              of <strong>{totalItems}</strong>
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          <ProductGrid products={pageProducts} />

          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- GRID + CARD + PAGINATION ---------- */

function ProductGrid({ products }: { products: TcgProductWithPrice[] }) {
  if (!products.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.productId} product={p} />
      ))}
    </div>
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

function getProductTypeLabel(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("booster")) return "Booster";
  if (lower.includes("deck")) return "Champion Deck";
  if (lower.includes("box") || lower.includes("display") || lower.includes("case"))
    return "Box / Display";
  if (lower.includes("bundle")) return "Bundle";
  return "Product";
}

function ProductCard({ product }: { product: TcgProductWithPrice }) {
  const isPresale = product.presaleInfo?.isPresale;
  const release = product.presaleInfo?.releasedOn
    ? new Date(product.presaleInfo.releasedOn).toLocaleDateString()
    : null;

  const subtype = product.price?.subTypeName ?? "Normal";
  const marketPrice = formatUSD(product.price?.marketPrice);
  const lowPrice = formatUSD(product.price?.lowPrice);
  const midPrice = formatUSD(product.price?.midPrice);
  const highPrice = formatUSD(product.price?.highPrice);

  const productType = getProductTypeLabel(product.name);

  return (
    <Card className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm">
      {/* Clickable top area: title + image */}
      <Link
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col"
      >
        <CardHeader className="space-y-1 pb-2 px-3 pt-3">
          <CardTitle className="line-clamp-2 text-[0.8rem] font-semibold text-slate-900 sm:text-sm">
            {product.name}
          </CardTitle>

          <div className="flex flex-wrap items-center gap-1.5 text-[0.65rem] text-slate-600">
            <span className="rounded-full bg-slate-100 px-2 py-0.5">
              {productType}
            </span>
            {isPresale && (
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-900"
              >
                Presale
              </Badge>
            )}
            {release && <Badge variant="outline">Release: {release}</Badge>}
            <Badge variant="outline">{subtype}</Badge>
          </div>
        </CardHeader>

        <div className="px-3 pb-0">
          <div className="relative w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            {product.imageUrl ? (
              <div className="relative aspect-[3/4]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
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
      </Link>

      <CardContent className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-2">
        {/* Price block */}
        <div className="space-y-1 rounded-md border border-slate-200 bg-slate-50 p-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[0.7rem] uppercase tracking-wide text-slate-500">
              Market price
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {marketPrice ?? "N/A"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-slate-600">
            <span>Low: {lowPrice ?? "N/A"}</span>
            <span>Mid: {midPrice ?? "N/A"}</span>
            <span>High: {highPrice ?? "N/A"}</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between gap-2 text-[0.7rem] text-slate-700">
          <span className="truncate text-slate-500">
            ID: {product.productId}
          </span>

          <Button
            asChild
            size="sm"
            className="h-8 px-3 text-[0.7rem]"
            variant="outline"
          >
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on TCGplayer
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2"
        disabled={!prevPage}
        onClick={() => prevPage && onPageChange(prevPage)}
      >
        Previous
      </Button>

      <span className="text-xs text-slate-700">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2"
        disabled={!nextPage}
        onClick={() => nextPage && onPageChange(nextPage)}
      >
        Next
      </Button>
    </div>
  );
}
