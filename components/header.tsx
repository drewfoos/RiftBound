"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useClerk,
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header({ fontClass }: { fontClass: string }) {
  const { signOut } = useClerk();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-25 w-full items-center justify-between px-6 sm:px-10">
        {/* ---------- LEFT: Logo Stack ---------- */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1"
        >
          <img
            src="/riftbound-logo.png"
            alt="Riftbound Logo"
            className="h-16 w-auto object-contain object-center -my-2"
          />
          <span
            className={`${fontClass} text-lg md:text-xl font-extrabold tracking-wide`}
          >
            Riftbound
          </span>
        </Link>

        {/* ---------- CENTER: Nav Links ---------- */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/products" className="hover:text-emerald-700 transition-colors">
            Products
          </Link>
          <Link href="/decks" className="hover:text-emerald-700 transition-colors">
            Decks
          </Link>
          <Link href="/about" className="hover:text-emerald-700 transition-colors">
            About
          </Link>
        </nav>

        {/* ---------- RIGHT: Auth Controls ---------- */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="hidden sm:flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
              <Button
                onClick={handleSignOut}
                size="sm"
                variant="outline"
                className="text-slate-700"
              >
                Sign Out
              </Button>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
