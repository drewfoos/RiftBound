// lib/decks.ts

export type DeckTier = "S" | "A" | "B" | "C";

export interface DeckCard {
  name: string;
  quantity: number;
}

export interface Deck {
  slug: string;
  name: string;
  tier: DeckTier;
  champions: string[];
  archetype: string;
  shortDescription: string;
  strengths: string[];
  weaknesses: string[];
  lastUpdated: string; // ISO date string
  cards?: DeckCard[]; // main deck
  sideboard?: DeckCard[];
  coverImageHint?: string;
}

export const metaDescription =
  "Click on a deck name to view the list, as well as the latest explanation and report on how the decks were placed here. Meta Tier List is updated for the global release of Riftbound.";

export const tierExplanations: Record<DeckTier, string> = {
  S: "These decks are at the top of the metagame, and are the decks to beat based on both power and popularity. You can expect to see a lot of players playing these decks, and you should prepare for them when choosing your own deck for a tournament or event.",
  A: "These decks are also going to be pretty popular, and contend for the top of the metagame. You should be aware of them, and they're still going to be great picks into the early days of Riftbound.",
  B: "While not the best of the metagame, these decks are still viable and are either rogue decks or just need a bit more support to be pushed over the edge to reach the higher tiers.",
  C: "These decks are fun, but don't really have enough support to be at the top of the metagame, due to a lack of good cards or a major hole in their game plan.",
};

export const decks: Deck[] = [
  // S TIER – Kai'Sa with full list
  {
    slug: "kaisa",
    name: "Kai'Sa",
    tier: "S",
    champions: ["Kai'Sa"],
    archetype: "Midrange Combo",
    shortDescription:
      "Flexible midrange deck that snowballs board presence while threatening explosive finishers with Kai'Sa.",
    strengths: [
      "Extremely high ceiling with strong curve and scaling threats",
      "Punishes unrefined brews in early meta",
      "Solid game plan into both aggressive and slower decks",
    ],
    weaknesses: [
      "Can stumble without early board presence",
      "Relies on key champs staying on board",
    ],
    lastUpdated: "2025-11-01",
    coverImageHint: "Champion Deck (Kai'Sa)",
    cards: [
      // main deck
      { name: "Reaver's Row", quantity: 1 },
      { name: "Targon's Peak", quantity: 1 },
      { name: "The Dreaming Tree", quantity: 1 },
      { name: "Kai'Sa - Daughter of the Void", quantity: 1 },

      { name: "Fury Rune", quantity: 7 },
      { name: "Mind Rune", quantity: 5 },

      { name: "Hextech Ray", quantity: 3 },
      { name: "Cleave", quantity: 3 },
      { name: "Retreat", quantity: 2 },
      { name: "Stupefy", quantity: 3 },
      { name: "Falling Star", quantity: 3 },
      { name: "Smoke Screen", quantity: 3 },
      { name: "Void Seeker", quantity: 3 },

      { name: "Pouty Poro", quantity: 2 },
      { name: "Freljord - Watchful Sentry", quantity: 3 },
      { name: "Noxus - Ravenbloom Student", quantity: 3 },
      { name: "Lecturing Yordle", quantity: 3 },
      { name: "Noxus Hopeful", quantity: 3 },

      { name: "Kai'Sa - Survivor", quantity: 1 },
      { name: "Darius - Trifarian", quantity: 3 },
      { name: "Ionia - Thousand-Tailed Watcher", quantity: 2 },

      { name: "Time Warp", quantity: 2 },
    ],
    sideboard: [
      { name: "Fae - Sprite Mother", quantity: 3 },
      { name: "Kai'Sa - Icathian Rain", quantity: 2 },
      { name: "Ionia - Thousand-Tailed Watcher", quantity: 1 },
    ],
  },

  // A TIER
  {
    slug: "master-yi",
    name: "Master Yi",
    tier: "A",
    champions: ["Master Yi"],
    archetype: "Control / Combo",
    shortDescription:
      "Spell-heavy control deck that leverages efficient removal and Yi's scaling to close out games.",
    strengths: [
      "Excellent into slower decks that can't pressure early",
      "Strong inevitability if the game goes long",
    ],
    weaknesses: [
      "Can struggle vs very fast openers",
      "Precise sequencing required to maximize value",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "sett",
    name: "Sett",
    tier: "A",
    champions: ["Sett"],
    archetype: "Midrange Bruiser",
    shortDescription:
      "Midrange deck centered on board dominance, combat tricks, and high-stat threats.",
    strengths: [
      "Great at contesting board on curve",
      "Punishes opponents that rely on small units",
    ],
    weaknesses: [
      "Can lack reach if the board is answered repeatedly",
      "Weak to hard removal and bounce effects",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "annie",
    name: "Annie",
    tier: "A",
    champions: ["Annie"],
    archetype: "Aggro / Burn",
    shortDescription:
      "Low-curve aggro deck that leverages burn spells and tempo to close games quickly.",
    strengths: [
      "Punishes greedy, slow decks",
      "Simple game plan and strong ladder choice",
    ],
    weaknesses: [
      "Falls off hard if the game goes too long",
      "Weak to lifegain and efficient removal",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "viktor",
    name: "Viktor",
    tier: "A",
    champions: ["Viktor"],
    archetype: "Value Engine / Control",
    shortDescription:
      "Grindy deck that uses Viktor as a value engine, outscaling opponents over time.",
    strengths: [
      "Very strong into midrange fights",
      "Good at leveraging incremental card advantage",
    ],
    weaknesses: [
      "Can be slow to stabilize vs hyper-aggro",
      "Requires careful resource management",
    ],
    lastUpdated: "2025-11-01",
  },

  // B TIER
  {
    slug: "ahri",
    name: "Ahri",
    tier: "B",
    champions: ["Ahri"],
    archetype: "Tempo / Tricksy",
    shortDescription:
      "Tempo deck built around tricky combat and repositioning to outplay opponents.",
    strengths: ["High outplay potential", "Punishes misplays heavily"],
    weaknesses: [
      "Fragile board and low raw stats",
      "Hard to pilot optimally over long events",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "teemo",
    name: "Teemo",
    tier: "B",
    champions: ["Teemo"],
    archetype: "Chip Damage / Poison",
    shortDescription:
      "Chip damage strategy that wins through incremental damage and nuisance threats.",
    strengths: ["Can steal games when unchecked", "Frustrating to play against"],
    weaknesses: [
      "Struggles vs clean removal and fast clocks",
      "Long time to actually end the game",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "miss-fortune",
    name: "Miss Fortune",
    tier: "B",
    champions: ["Miss Fortune"],
    archetype: "Aggro / Tokens",
    shortDescription:
      "Token-based aggro deck that leverages Miss Fortune’s board-wide damage.",
    strengths: ["Explosive early turns", "Great vs decks that rely on small units"],
    weaknesses: [
      "Weak to sweepers and life gain",
      "Can run out of gas if stabilized against",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "darius",
    name: "Darius",
    tier: "B",
    champions: ["Darius"],
    archetype: "Aggro / Midrange Smash",
    shortDescription:
      "Brute-force deck with high power units and direct damage finishers.",
    strengths: ["Punishes stumbles very hard", "Simple, direct game plan"],
    weaknesses: [
      "Telegraphed game plan, easy to prepare for",
      "Rough vs efficient removal + blockers",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "jinx",
    name: "Jinx",
    tier: "B",
    champions: ["Jinx"],
    archetype: "Discard Aggro",
    shortDescription:
      "Fast deck that empties its hand to turn on Jinx and burn out opponents.",
    strengths: ["Very strong ladder deck", "Ends games quickly when unchecked"],
    weaknesses: [
      "Inconsistent draws can brick",
      "Weak vs early lifegain and sweepers",
    ],
    lastUpdated: "2025-11-01",
  },

  // C TIER
  {
    slug: "yasuo",
    name: "Yasuo",
    tier: "C",
    champions: ["Yasuo"],
    archetype: "Stun / Control",
    shortDescription:
      "Control deck built around stun and repositioning, but currently lacks efficient tools.",
    strengths: ["Fun, stylish play patterns", "Can lock out unprepared decks"],
    weaknesses: [
      "Missing some key support cards",
      "Slow and fragile game plan vs meta decks",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "volibear",
    name: "Volibear",
    tier: "C",
    champions: ["Volibear"],
    archetype: "Big Overwhelm",
    shortDescription:
      "Ramp into giant threats with Volibear, aiming to trample over defenses.",
    strengths: ["Spectacular when it works", "Great casual/fun option"],
    weaknesses: [
      "Inconsistent ramp draws",
      "Folded by efficient hard removal",
    ],
    lastUpdated: "2025-11-01",
  },
  {
    slug: "lux",
    name: "Lux",
    tier: "C",
    champions: ["Lux"],
    archetype: "Spell Combo",
    shortDescription:
      "Spell-based deck that wants to chain expensive spells, but lacks the speed of top decks.",
    strengths: ["High ceiling and satisfying wins", "Flexible answers"],
    weaknesses: [
      "Too slow for current meta",
      "Relies on drawing specific pieces",
    ],
    lastUpdated: "2025-11-01",
  },
];

export function getDecksByTier(tier: DeckTier): Deck[] {
  return decks.filter((d) => d.tier === tier);
}

export function getDeckBySlug(slug: string): Deck | undefined {
  return decks.find((d) => d.slug === slug);
}

export function getAllDecks(): Deck[] {
  return decks;
}
