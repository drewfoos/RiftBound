// app/about/page.tsx
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Riftbound • League of Legends TCG
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            About This Project
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            A community-driven tracker for Riftbound TCG products and market
            prices.
          </p>
        </header>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              What is Riftbound?
            </h2>
            <p>
              <strong>Riftbound: League of Legends TCG</strong> is Riot Games’
              officially licensed trading card game, featuring iconic champions,
              abilities, and regions from Runeterra. The game blends
              deckbuilding strategy with tactical play, creating a deep and
              competitive experience for fans of both League of Legends and
              collectible card games.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              About This Site
            </h2>
            <p>
              This site is a fan-built resource that collects and displays data
              from <strong>TCGplayer</strong> and other price tracking APIs.
              It’s designed to help players and collectors stay up-to-date with
              product releases, live market trends, and sealed product pricing
              for current and upcoming Riftbound sets.
            </p>
            <p className="mt-2">
              It is not affiliated with or endorsed by Riot Games, Inc. or
              TCGplayer. All trademarks and images belong to their respective
              owners.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Supported Sets
            </h2>
            <p>
              Currently, the site focuses on the launch-era product line
              <strong> Riftbound: Origins</strong>, with support planned for
              future expansions:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Badge variant="secondary">Origins</Badge>
              <Badge variant="secondary">Proving Grounds</Badge>
              <Badge variant="secondary">Worlds 2025</Badge>
              <Badge variant="secondary">Spiritforged</Badge>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Future Development
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Integration with Riot’s official Riftbound API (pending key approval)</li>
              <li>Deck builder and card database with filtering tools</li>
              <li>Historical price charts for sealed and singles</li>
              <li>Export options for collection tracking</li>
            </ul>
          </section>
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          Riftbound and League of Legends are trademarks of Riot Games, Inc.
          This project is not affiliated with Riot Games or TCGplayer.
        </footer>
      </section>
    </main>
  );
}
