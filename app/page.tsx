"use client";

import Link from "next/link";
import { InfinityIcon, UserRound, UsersRound } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

type PlayerMode = "single" | "two" | "multi";

const games = [
  {
    name: "Tic-Tac-Toe",
    description: "A quick three-in-a-row duel.",
    icon: "×",
    modes: ["single", "two"] as PlayerMode[],
    tone: "mint",
  },
  // { name: "Snake", description: "Grow, dodge, and chase a high score.", icon: "蛇", modes: ["single"] as PlayerMode[], tone: "lavender" },
  // { name: "Chess", description: "A thoughtful battle across the board.", icon: "♟", modes: ["single", "two"] as PlayerMode[], tone: "peach" },
  // { name: "Spy", description: "Ask, bluff, and uncover the spy.", icon: "?", modes: ["two", "multi"] as PlayerMode[], tone: "pink" },
];

const modeOptions: { id: PlayerMode; label: string; icon: ReactNode }[] = [
  { id: "single", label: "Single player", icon: <UserRound /> },
  { id: "two", label: "2 player", icon: <UsersRound /> },
  { id: "multi", label: "Multiplayer", icon: <InfinityIcon /> },
];

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<PlayerMode>("two");
  const filteredGames = games.filter((game) => game.modes.includes(activeMode));

  return (
    <main className="mx-auto w-[calc(100%-48px)] max-w-295 px-0 py-14">
      <section className="mb-7">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-[#68647d]">
          Choose your game
        </span>
        <h1 className="font-serif text-5xl leading-none tracking-tight sm:text-7xl">
          Play a little.
        </h1>
      </section>

      <section
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Filter games by player mode"
      >
        {modeOptions.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant={activeMode === option.id ? "active" : "default"}
            size="default"
            className="h-20 justify-center rounded-2xl text-base"
            aria-pressed={activeMode === option.id}
            onClick={() => setActiveMode(option.id)}
          >
            <span
              className="grid size-10 place-items-center rounded-full border-[3px] border-current bg-white/60"
              aria-hidden="true"
            >
              {option.icon}
            </span>
            <span>{option.label}</span>
          </Button>
        ))}
      </section>

      <section aria-live="polite" aria-label={`${activeMode} games`}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredGames.map((game) => (
            <Card
              className={`min-h-50 ${
                game.tone === "mint"
                  ? "bg-[#84dfad]"
                  : game.tone === "lavender"
                    ? "bg-[#a9a0f2]"
                    : game.tone === "peach"
                      ? "bg-[#ffad74]"
                      : "bg-[#ff91ad]"
              } transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#25243a]`}
              key={game.name}
            >
              <CardContent className="grid min-h-48.5 grid-cols-[84px_1fr] items-center gap-4 p-5 sm:grid-cols-[112px_1fr_auto]">
                <div
                  className="grid size-21 place-items-center rounded-full border-[3px] border-[#25243a] bg-[#fffdf3] shadow-[4px_4px_0_#25243a] text-5xl font-black sm:size-28"
                  aria-hidden="true"
                >
                  {game.icon}
                </div>
                <div>
                  <h2 className="mb-1 font-serif text-2xl font-bold">
                    {game.name}
                  </h2>
                  <p className="m-0 text-sm font-bold text-[#403d54]">
                    {game.description}
                  </p>
                </div>
                <Button
                  asChild
                  size="default"
                  className="col-span-2 mt-2 h-10 px-4 sm:col-span-1 sm:mt-20"
                >
                  <Link href="/multi-player/tic-tac-toe">Play now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <p className="py-10 text-center text-[#68647d]">
            No games in this mode yet.
          </p>
        )}
      </section>
    </main>
  );
}
