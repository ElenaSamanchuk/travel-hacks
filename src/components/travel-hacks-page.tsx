"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveChecklist } from "@/components/interactive-checklist";
import {
  categoryMeta,
  travelHacks,
  type HackCategory,
} from "@/data/travel-hacks";

const categories: HackCategory[] = ["planning", "spontaneous", "universal"];

export function TravelHacksPage() {
  const [activeTab, setActiveTab] = useState<HackCategory>("planning");

  const hacksByCategory = useMemo(() => {
    return categories.reduce(
      (acc, cat) => {
        acc[cat] = travelHacks.filter((h) => h.category === cat);
        return acc;
      },
      {} as Record<HackCategory, typeof travelHacks>,
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-foreground">
      <header className="border-b border-border/40 bg-[#f7f4ef]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
              aria-hidden
            >
              T
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Travel Hacks
              </p>
              <p className="text-sm font-medium">Чеклист путешественника</p>
            </div>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">
            inspired by editorial travel guides
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <article className="space-y-10 sm:space-y-14">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Как спланировать отпуск и не разочароваться
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-muted-foreground/70">Ненадёжные</span>
              <span className="text-foreground">надежды</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              «Можно забронировать всё, кроме идеального момента». Долгожданные
              каникулы обязаны сделать нас счастливыми — но чем больше мы
              вкладываем в план, тем выше ставка ожиданий. Этот чеклист —
              план действий на любой сценарий: отпуск за полгода, спонтанный
              трип или жизнь без разделения работы и путешествий.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                stat: "12",
                label: "советов для планировщиков",
                accent: "bg-[#e8e2d8]",
              },
              {
                stat: "6",
                label: "правил для спонтанных поездок",
                accent: "bg-[#dfe8e4]",
              },
              {
                stat: "6",
                label: "универсальных лайфхаков",
                accent: "bg-[#e8dfe8]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl p-5 ${item.accent}`}
              >
                <p className="font-serif text-4xl">{item.stat}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <blockquote
            className="rounded-2xl border border-border/50 bg-card/60 p-6 sm:p-8"
          >
            <p className="font-serif text-xl leading-relaxed sm:text-2xl">
              Отпуск перестаёт быть отдыхом и становится инвестиционным
              проектом, который обязан принести дивиденды.
            </p>
            <footer className="mt-4 text-sm text-muted-foreground">
              — и тогда реальность почти всегда проигрывает в сравнении с
              ожиданиями
            </footer>
          </blockquote>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as HackCategory)}
            className="space-y-8"
          >
            <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full border border-transparent px-5 py-2.5 data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  {categoryMeta[cat].label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <InteractiveChecklist
                  hacks={hacksByCategory[cat]}
                  category={cat}
                />
              </TabsContent>
            ))}
          </Tabs>

          <section className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-3xl">
              Маршрут не построен?
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Если все лайфхаки испробованы, но идеальный отпуск всё равно не
              случается — не планируйте. Спонтанность тоже стратегия. Главное —
              знать, где поспать, и оставить место для сюрпризов.
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          Чеклист для путешественников · Соберите свой набор правил перед
          следующей поездкой
        </div>
      </footer>
    </div>
  );
}
