import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export const metadata: Metadata = {
  title: "Single Player",
  description: "Choose a single-player game.",
};

const games = [
  {
    name: "Tic-Tac-Toe",
    description: "Outsmart the board in a classic three-in-a-row duel.",
    icon: "×",
    tone: "bg-[#84dfad]",
  },
];

export default function SinglePlayerPage() {
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
          Solo mode
        </span>
        <h1 className="font-serif text-5xl leading-none sm:text-7xl">
          Single Player
        </h1>
        <p className="mt-5 text-lg text-[#68647d]">
          Play at your own pace and challenge yourself.
        </p>
      </section>

      <section
        className="grid gap-5 md:grid-cols-3"
        aria-label="Single-player games"
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
              <span className="mt-5 inline-block rounded-full border-2 border-[#25243a] bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-widest">
                Coming soon
              </span>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
