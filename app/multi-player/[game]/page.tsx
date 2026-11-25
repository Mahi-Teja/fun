import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { TicTacToe } from "./tic-tac-toe";

const games: Record<string, string> = {
  "tic-tac-toe": "Tic-Tac-Toe",
};

export const instant = false;

export function generateStaticParams() {
  return [{ game: "tic-tac-toe" }];
}

export default async function MultiplayerGamePage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const gameName = games[game];

  if (!gameName) notFound();

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-[860px] py-12 sm:w-[calc(100%-48px)]">
      <Button asChild variant="default" className="h-10 border-0 shadow-none hover:bg-white/70">
        <Link href="/multi-player"><ArrowLeft /> All multiplayer games</Link>
      </Button>

      {game === "tic-tac-toe" && <TicTacToe />}
    </main>
  );
}
