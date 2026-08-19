"use client";

import { EditorialImage } from "@/components/editorial-image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TravelHack } from "@/data/travel-hacks";
import {
  type ScatterPosition,
  sizeClasses,
} from "@/data/checklist-layout";

type HoverChecklistProps = {
  hacks: TravelHack[];
  positions: ScatterPosition[];
  title: string;
  hint?: string;
  backgroundName?: string;
  backgroundAlt?: string;
};

export function HoverChecklist({
  hacks,
  positions,
  title,
  hint = "Наведите на цифру, чтобы прочитать пункт",
  backgroundName,
  backgroundAlt = "",
}: HoverChecklistProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const activeHack = hacks.find((h) => h.id === activeId);
  const activeIndex = activeHack
    ? hacks.findIndex((h) => h.id === activeId)
    : -1;

  const handleEnter = useCallback(
    (id: number) => {
      if (!isTouch) setActiveId(id);
    },
    [isTouch],
  );

  const handleLeave = useCallback(() => {
    if (!isTouch) setActiveId(null);
  }, [isTouch]);

  const handleClick = useCallback(
    (id: number) => {
      if (isTouch) {
        setActiveId((prev) => (prev === id ? null : id));
      }
    },
    [isTouch],
  );

  return (
    <section className="my-16 sm:my-24">
      <h2 className="max-w-2xl font-serif text-2xl leading-snug sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm tracking-wide text-muted-foreground">
        {hint}
      </p>

      <div
        ref={containerRef}
        className="relative mt-10 h-[min(72vh,640px)] w-full select-none overflow-hidden"
        onMouseLeave={handleLeave}
      >
        {backgroundName && (
          <div className="pointer-events-none absolute inset-0">
            <EditorialImage
              name={backgroundName}
              alt={backgroundAlt}
              className="opacity-40 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-[#f7f4ef]/35" />
          </div>
        )}

        {hacks.map((hack, index) => {
          const pos = positions[index] ?? positions[0];
          const isActive = activeId === hack.id;

          return (
            <button
              key={hack.id}
              type="button"
              aria-label={`${hack.id}. ${hack.title}`}
              aria-expanded={isActive}
              className="absolute z-10 cursor-pointer touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `rotate(${pos.rotate ?? 0}deg)`,
              }}
              onMouseEnter={() => handleEnter(hack.id)}
              onFocus={() => handleEnter(hack.id)}
              onBlur={handleLeave}
              onClick={() => handleClick(hack.id)}
            >
              <span
                className={[
                  "block font-serif leading-none transition-all duration-500 ease-out",
                  sizeClasses[pos.size],
                  isActive
                    ? "text-foreground scale-110"
                    : "text-foreground/25 hover:text-foreground/70 hover:scale-105",
                ].join(" ")}
              >
                {index + 1}
              </span>
            </button>
          );
        })}

        {/* Floating detail card */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-all duration-500 ease-out",
            activeHack
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          ].join(" ")}
          aria-live="polite"
        >
          {activeHack && (
            <div className="mx-auto max-w-2xl border-t border-foreground/15 bg-[#f7f4ef]/95 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-8">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-5xl text-foreground/20 sm:text-6xl">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 space-y-3">
                  <h3 className="font-serif text-xl leading-tight sm:text-2xl">
                    {activeHack.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {activeHack.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
