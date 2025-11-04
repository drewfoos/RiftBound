// app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/header";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Riftbound TCG",
  description: "Riftbound card database and deck builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground">
          <Header fontClass={rajdhani.className} /> {/* ← pass font */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
