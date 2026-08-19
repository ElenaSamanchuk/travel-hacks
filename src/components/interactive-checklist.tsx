"use client";

import { useCallback, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { HackCategory, TravelHack } from "@/data/travel-hacks";
import { categoryMeta } from "@/data/travel-hacks";

type InteractiveChecklistProps = {
  hacks: TravelHack[];
  category: HackCategory;
};

export function InteractiveChecklist({
  hacks,
  category,
}: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [activeId, setActiveId] = useState<number | null>(hacks[0]?.id ?? null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const meta = categoryMeta[category];
  const progress = hacks.length
    ? Math.round((checked.size / hacks.length) * 100)
    : 0;

  const activeHack = useMemo(
    () => hacks.find((h) => h.id === activeId) ?? hacks[0],
    [hacks, activeId],
  );

  const toggleCheck = useCallback((id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const resetChecks = useCallback(() => {
    setChecked(new Set());
  }, []);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {meta.subtitle}
        </p>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {meta.intro}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card/50 p-4 sm:p-5">
        <div className="min-w-[140px] flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Прогресс чеклиста</span>
            <span className="font-medium tabular-nums">
              {checked.size}/{hacks.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Сетка
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Список
          </Button>
          {checked.size > 0 && (
            <Button variant="ghost" size="sm" onClick={resetChecks}>
              Сбросить
            </Button>
          )}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4"
            role="list"
            aria-label="Чеклист лайфхаков"
          >
            {hacks.map((hack) => {
              const isActive = activeId === hack.id;
              const isDone = checked.has(hack.id);
              return (
                <button
                  key={hack.id}
                  type="button"
                  role="listitem"
                  aria-pressed={isActive}
                  aria-label={`${hack.id}. ${hack.title}`}
                  onClick={() => setActiveId(hack.id)}
                  className={[
                    "group relative flex aspect-square items-center justify-center rounded-2xl border text-center transition-all duration-300",
                    isActive
                      ? "border-foreground bg-foreground text-background shadow-lg scale-[1.02]"
                      : "border-border/70 bg-card hover:border-foreground/40 hover:bg-accent/50",
                    isDone && !isActive && "opacity-60",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-serif text-3xl sm:text-4xl transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-105",
                    ].join(" ")}
                  >
                    {hack.id}
                  </span>
                  {isDone && (
                    <span
                      className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          <aside
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:sticky lg:top-8 lg:self-start"
            aria-live="polite"
          >
            {activeHack && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif text-5xl leading-none text-muted-foreground/40">
                    {String(activeHack.id).padStart(2, "0")}
                  </span>
                  {activeHack.tag && (
                    <Badge variant="secondary" className="shrink-0">
                      {activeHack.tag}
                    </Badge>
                  )}
                </div>
                <h3 className="font-serif text-2xl leading-tight">
                  {activeHack.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activeHack.description}
                </p>
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-3 transition-colors hover:bg-accent/30"
                >
                  <Checkbox
                    checked={checked.has(activeHack.id)}
                    onCheckedChange={() => toggleCheck(activeHack.id)}
                    aria-label={`Отметить: ${activeHack.title}`}
                  />
                  <span className="text-sm">Выполнено — беру в чеклист</span>
                </label>
              </div>
            )}
            <p className="mt-6 text-xs text-muted-foreground">
              Наведите на цифру или нажмите, чтобы прочитать пункт
            </p>
          </aside>
        </div>
      ) : (
        <ul className="space-y-3">
          {hacks.map((hack) => {
            const isDone = checked.has(hack.id);
            return (
              <li
                key={hack.id}
                className={[
                  "rounded-2xl border border-border/60 bg-card p-4 sm:p-5 transition-opacity",
                  isDone ? "opacity-70" : "",
                ].join(" ")}
              >
                <div className="flex gap-4">
                  <Checkbox
                    checked={isDone}
                    onCheckedChange={() => toggleCheck(hack.id)}
                    className="mt-1"
                    aria-label={`Отметить: ${hack.title}`}
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-lg text-muted-foreground">
                        {String(hack.id).padStart(2, "0")}
                      </span>
                      {hack.tag && (
                        <Badge variant="outline" className="text-xs">
                          {hack.tag}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-serif text-xl leading-snug">
                      {hack.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {hack.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
