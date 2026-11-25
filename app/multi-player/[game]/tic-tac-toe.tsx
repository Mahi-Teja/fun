"use client";

import { Circle, CircleHelp, RotateCcw, Shuffle, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

type Mark = "X" | "O";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function MarkIcon({
  mark,
  className = "size-12 sm:size-16",
}: {
  mark: Mark;
  className?: string;
}) {
  return mark === "X" ? (
    <X
      className={`${className} text-[#c94f6d]`}
      strokeWidth={3.5}
      aria-hidden="true"
    />
  ) : (
    <Circle
      className={`${className} text-[#315c98]`}
      strokeWidth={3.5}
      aria-hidden="true"
    />
  );
}

export function TicTacToe() {
  const [mode, setMode] = useState<"toe" | "toss">("toe");
  const [board, setBoard] = useState<(Mark | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("X");
  const [errorMessage, setErrorMessage] = useState("");
  const [xPositions, setXPositions] = useState<number[]>([]);
  const [oPositions, setOPositions] = useState<number[]>([]);
  const [showRules, setShowRules] = useState(false);

  const winningLine =
    mode === "toe"
      ? winningLines.find(
          ([a, b, c]) =>
            board[a] && board[a] === board[b] && board[a] === board[c],
        )
      : winningLines.find(([a, b, c]) => {
          const xWins =
            xPositions.includes(a) &&
            xPositions.includes(b) &&
            xPositions.includes(c);
          const oWins =
            oPositions.includes(a) &&
            oPositions.includes(b) &&
            oPositions.includes(c);
          return xWins || oWins;
        });

  const winner = winningLine
    ? mode === "toe"
      ? board[winningLine[0]]
      : xPositions.includes(winningLine[0])
        ? "X"
        : "O"
    : null;
  const isDraw = mode === "toe" && !winner && board.every(Boolean);
  const confettiPieces = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 8) * 0.06}s`,
    color: ["#ff6d92", "#ffca58", "#315c98", "#84dfad"][index % 4],
  }));

  function play(index: number) {
    setErrorMessage("");
    if (winner || isDraw) return;

    if (board[index]) {
      setErrorMessage("That square is already taken.");
      return;
    }

    const nextBoard = [...board];

    if (mode === "toss") {
      if (currentPlayer === "X") {
        if (xPositions.length === 3) nextBoard[xPositions[0]] = null;
        setXPositions((positions) =>
          positions.length === 3
            ? [...positions.slice(1), index]
            : [...positions, index],
        );
      } else {
        if (oPositions.length === 3) nextBoard[oPositions[0]] = null;
        setOPositions((positions) =>
          positions.length === 3
            ? [...positions.slice(1), index]
            : [...positions, index],
        );
      }
    }

    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setErrorMessage("");
    setXPositions([]);
    setOPositions([]);
  }

  function toggleMode() {
    reset();
    setMode((current) => (current === "toe" ? "toss" : "toe"));
  }

  const dimIndex =
    currentPlayer === "X"
      ? xPositions.length === 3
        ? xPositions[0]
        : null
      : oPositions.length === 3
        ? oPositions[0]
        : null;

  return (
    <>
      <section className="mb-8 text-center">
        <span className="mb-3 block text-xs font-black uppercase tracking-[.16em] text-[#68647d]">
          Two player
        </span>
        <h1
          className="font-serif text-5xl leading-none sm:text-7xl"
          aria-live="polite"
        >
          {mode === "toe" ? "Tic-Tac-Toe" : "Tic-Tac-Toss"}
        </h1>
      </section>

      <Card className="relative mx-auto max-w-130 touch-manipulation overflow-hidden bg-[#70bdd0] p-4 sm:p-7">
        {winner && (
          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            aria-hidden="true"
          >
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="game-confetti"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  backgroundColor: piece.color,
                }}
              />
            ))}
          </div>
        )}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className={`relative z-30 flex min-h-12 items-center gap-2 rounded-full border-[3px] border-[#25243a] bg-[#fffdf3] px-4 py-2 text-sm font-black transition-all ${
              winner ? "game-status-win scale-105" : ""
            } ${isDraw ? "game-status-draw" : ""}`}
            role="status"
          >
            {winner ? (
              <>
                <MarkIcon mark={winner} className="size-5" />{" "}
                <span>{winner} wins!</span>
              </>
            ) : isDraw ? (
              "It&apos;s a draw!"
            ) : (
              <>
                <MarkIcon mark={currentPlayer} className="size-5" />
                <span>{currentPlayer}&apos;s turn</span>
              </>
            )}
          </div>

          <div className="relative z-30 flex flex-wrap gap-2 sm:justify-end">
            <Button
              type="button"
              variant="default"
              onClick={toggleMode}
              aria-label={`Switch to Tic-Tac-${mode === "toe" ? "Toss" : "Toe"}`}
            >
              {mode === "toe" ? <Shuffle /> : <Circle />}
              {mode === "toe" ? "Play Toss" : "Play Toe"}
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              onClick={() => setShowRules(true)}
              aria-label="How to play"
            >
              <CircleHelp />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              onClick={reset}
              aria-label="Reset game"
            >
              <RotateCcw />
            </Button>
          </div>
        </div>

        <div
          className="mb-3 min-h-5 text-center text-sm font-black text-[#9d3d56]"
          role="status"
        >
          {errorMessage ||
            (mode === "toss" && dimIndex !== null
              ? "The highlighted piece will move next."
              : "")}
        </div>

        <div
          className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3"
          aria-label={`${mode === "toe" ? "Tic-Tac-Toe" : "Tic-Tac-Toss"} board`}
        >
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index);

            return (
              <button
                key={index}
                type="button"
                className={`grid aspect-square min-h-0 touch-manipulation place-items-center rounded-xl border-[3px] border-[#25243a] bg-[#fffdf3] shadow-[4px_4px_0_#25243a] transition-all sm:rounded-[14px] ${
                  isWinningCell ? "game-winning-cell bg-[#ffca58]" : ""
                } ${
                  mode === "toss" && dimIndex === index
                    ? (currentPlayer === "X"
                        ? "game-neon-x"
                        : "game-neon-o")
                    : ""
                } ${winner || isDraw ? "pointer-events-none" : "enabled:hover:-translate-y-1 enabled:active:translate-y-1 enabled:active:shadow-none"}`}
                onClick={(event) => {
                  event.preventDefault();
                  play(index);
                }}
                aria-label={`Square ${index + 1}${cell ? `: Player ${cell}` : ", empty"}`}
              >
                {cell && <MarkIcon mark={cell} />}
              </button>
            );
          })}
        </div>
      </Card>

      {showRules && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#25243a]/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setShowRules(false);
          }}
        >
          <div className="max-h-[calc(100vh-32px)] w-full max-w-md overflow-y-auto rounded-[18px] border-[3px] border-[#25243a] bg-[#fffdf3] p-5 text-[#25243a] shadow-[8px_8px_0_#25243a] sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b-2 border-[#25243a]/15 pb-4">
              <h2 id="rules-title" className="font-serif text-3xl font-bold">
                How to play
              </h2>
              <Button
                type="button"
                variant="default"
                size="icon"
                onClick={() => setShowRules(false)}
                aria-label="Close rules"
              >
                <X />
              </Button>
            </div>

            {mode === "toe" ? (
              <ol className="space-y-3 text-sm font-bold leading-6">
                <li>
                  <strong>1.</strong> Player X starts. Players take turns
                  placing a mark.
                </li>
                <li>
                  <strong>2.</strong> Choose any empty square.
                </li>
                <li>
                  <strong>3.</strong> Match three marks in a row, column, or
                  diagonal to win.
                </li>
                <li>
                  <strong>4.</strong> If every square fills with no winner, the
                  round is a draw.
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm font-bold leading-6">
                <li>
                  <strong>1.</strong> Player X starts. The first three marks for
                  each player are placed normally.
                </li>
                <li>
                  <strong>2.</strong> After three marks, a player moves their
                  oldest mark to an empty square.
                </li>
                <li>
                  <strong>3.</strong> The highlighted piece indicates the mark
                  that will move.
                </li>
                <li>
                  <strong>4.</strong> Match three marks to win. Tic-Tac-Toss has
                  no draw.
                </li>
              </ol>
            )}

            <Button
              type="button"
              variant="active"
              className="mt-6 w-full"
              onClick={() => setShowRules(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
