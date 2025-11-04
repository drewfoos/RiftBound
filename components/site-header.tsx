// components/site-header.tsx
"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="font-semibold text-lg">
        Riftbound TCG
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/cards" className="text-sm hover:underline">
          Cards
        </Link>
        <Link href="/decks" className="text-sm hover:underline">
          Decks
        </Link>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm rounded px-3 py-1 border">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}
