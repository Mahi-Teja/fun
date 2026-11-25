import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export const metadata: Metadata = {
  title: "Multiplayer",
  description: "Choose a multiplayer game.",
};

const games = [
  {
    name: "Tic-Tac-Toe",
    description: "Two players. One board. A classic rivalry.",
    icon: "×",
    tone: "bg-[#70bdd0]",
  },
  // { name: "Spy", description: "Ask carefully, bluff boldly, and uncover the spy.", icon: "?", tone: "bg-[#ff91ad]" },
  // { name: "Chess", description: "Face a friend across the board and plan your next move.", icon: "♟", tone: "bg-[#a9a0f2]" },
];

export default function MultiPlayerPage() {
  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[1180px] py-12 sm:w-[calc(100%-48px)]">
      <Button
        asChild
        variant="default"
        className="h-10 border-0 shadow-none hover:bg-white/70"
      >
        <Link href="/">
          <ArrowLeft /> All games
        </Link>
      </Button>

      <section className="mb-10 mt-12">
        <span className="mb-3 block text-xs font-black uppercase tracking-[.16em] text-[#68647d]">
          Party mode
        </span>
        <h1 className="font-serif text-5xl leading-none sm:text-7xl">
          Multiplayer
        </h1>
        <p className="mt-5 text-lg text-[#68647d]">
          Invite a friend and turn game night into a showdown.
        </p>
      </section>

      <section
        className="grid gap-5 md:grid-cols-3"
        aria-label="Multiplayer games"
      >
        {games.map((game) => (
          <Card
            key={game.name}
            className={`${game.tone} transition-transform hover:-translate-y-1`}
          >
            <CardContent className="min-h-[300px] p-6">
              <div
                className="grid h-44 place-items-center rounded-[14px] border-b-[3px] border-[#25243a] text-7xl font-black"
                aria-hidden="true"
              >
                {game.icon}
              </div>
              <h2 className="mt-5 font-serif text-2xl font-bold">
                {game.name}
              </h2>
              <p className="mt-1 text-sm font-bold text-[#403d54]">
                {game.description}
              </p>
              <Button asChild className="mt-5 h-10 px-4">
                <Link href="/multi-player/tic-tac-toe">
                  Play now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
