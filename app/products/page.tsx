import type { TcgProductWithPrice } from "@/lib/tcg";
import { getOriginsProductsWithPrices } from "@/lib/tcg";
import { ProductsClient } from "@/components/products-client";

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolved = await searchParams;
  const pageParam = resolved.page ?? "1";
  const initialPage = Number(pageParam) || 1;

  const allProducts: TcgProductWithPrice[] = await getOriginsProductsWithPrices();

  return (
    <ProductsClient
      allProducts={allProducts}
      initialPage={initialPage}
    />
  );
}
