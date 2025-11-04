// lib/tcg.ts

// ---- Types ----

export interface TcgPresaleInfo {
  isPresale: boolean;
  releasedOn: string | null;
  note: string | null;
}

export interface TcgProduct {
  productId: number;
  name: string;
  cleanName: string;
  imageUrl: string;
  categoryId: number;
  groupId: number;
  url: string;
  modifiedOn: string;
  imageCount: number;
  presaleInfo: TcgPresaleInfo;
  extendedData: any[];
}

export interface TcgProductsResponse {
  totalItems: number;
  success: boolean;
  errors: any[];
  results: TcgProduct[];
}

export interface TcgPrice {
  productId: number;
  lowPrice: number | null;
  midPrice: number | null;
  highPrice: number | null;
  marketPrice: number | null;
  directLowPrice: number | null;
  subTypeName: string; // e.g. "Normal", "Foil"
}

export interface TcgPricesResponse {
  success: boolean;
  errors: any[];
  results: TcgPrice[];
}

export interface TcgProductWithPrice extends TcgProduct {
  price?: TcgPrice; // normal subtype or first available
}

// ---- Config / groups ----

const CATEGORY_ID = 89;
const BASE_URL = `https://tcgcsv.com/tcgplayer/${CATEGORY_ID}`;

// Group IDs you pasted:
export const RIFTBOUND_GROUPS = {
  PROMOS: {
    id: 24343,
    name: "Riftbound Promotional Cards",
  },
  ORIGINS: {
    id: 24344,
    name: "Origins",
  },
  ORIGINS_PROVING_GROUNDS: {
    id: 24439,
    name: "Origins: Proving Grounds",
  },
  WORLDS_BUNDLE_2025: {
    id: 24502,
    name: "Riftbound Worlds Bundle 2025",
  },
  SPIRITFORGED: {
    id: 24519,
    name: "Spiritforged",
  },
} as const;

// Helper to list groups in a dropdown if you want later:
export const ALL_RIFTBOUND_GROUPS = Object.values(RIFTBOUND_GROUPS);

// ---- Fetch functions ----

// Raw products for a specific group
export async function getGroupProducts(groupId: number): Promise<TcgProduct[]> {
  const url = `${BASE_URL}/${groupId}/products`;
  const res = await fetch(url, {
    next: { revalidate: 60 }, // revalidate every 60s
  });

  if (!res.ok) {
    throw new Error(`TCGCSV products error ${res.status} for group ${groupId}`);
  }

  const data = (await res.json()) as TcgProductsResponse;
  if (!data.success) {
    console.warn("TCGCSV products returned errors:", data.errors);
  }

  return data.results;
}

// Raw prices for a specific group
export async function getGroupPrices(groupId: number): Promise<TcgPrice[]> {
  const url = `${BASE_URL}/${groupId}/prices`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`TCGCSV prices error ${res.status} for group ${groupId}`);
  }

  const data = (await res.json()) as TcgPricesResponse;
  if (!data.success) {
    console.warn("TCGCSV prices returned errors:", data.errors);
  }

  return data.results;
}

// Products + merged price info (by productId, preferring Normal subtype)
export async function getGroupProductsWithPrices(
  groupId: number,
): Promise<TcgProductWithPrice[]> {
  const [products, prices] = await Promise.all([
    getGroupProducts(groupId),
    getGroupPrices(groupId),
  ]);

  // Build map: productId -> preferred price (Normal subtype if exists)
  const priceMap = new Map<number, TcgPrice>();

  for (const price of prices) {
    const existing = priceMap.get(price.productId);

    // Prefer "Normal" subtype; otherwise keep first seen
    if (!existing) {
      priceMap.set(price.productId, price);
    } else if (price.subTypeName === "Normal" && existing.subTypeName !== "Normal") {
      priceMap.set(price.productId, price);
    }
  }

  return products.map((p) => ({
    ...p,
    price: priceMap.get(p.productId),
  }));
}

// Convenience function for Origins specifically (group 24344)
export async function getOriginsProductsWithPrices(): Promise<
  TcgProductWithPrice[]
> {
  return getGroupProductsWithPrices(RIFTBOUND_GROUPS.ORIGINS.id);
}


// All Riftbound products (all groups combined)
export async function getAllRiftboundProductsWithPrices(): Promise<
  TcgProductWithPrice[]
> {
  const lists = await Promise.all(
    ALL_RIFTBOUND_GROUPS.map((group) => getGroupProductsWithPrices(group.id)),
  );

  return lists.flat();
}
