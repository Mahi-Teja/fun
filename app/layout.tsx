import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Games",
    template: "%s | Games",
  },
  description: "Small games for one player or two.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-[#fff8dc] text-[#25243a] antialiased">
        <header className="mx-auto flex h-[94px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between border-b-[3px] border-[#25243a]">
          <Link className="flex items-center gap-3 text-lg font-black" href="/" aria-label="Games home">
            <span className="grid size-8 rotate-[-8deg] grid-cols-2 gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((tile) => (
                <i key={tile} className="rounded-[4px] border-2 border-[#25243a] bg-[#ff6d92]" />
              ))}
            </span>
            <span>Games</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-extrabold sm:gap-8" aria-label="Main navigation">
            <Link className="transition-transform hover:-translate-y-0.5" href="/">Home</Link>
            <Link className="transition-transform hover:-translate-y-0.5" href="/single-player">Single</Link>
            <Link className="transition-transform hover:-translate-y-0.5" href="/multi-player">Multiplayer</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
