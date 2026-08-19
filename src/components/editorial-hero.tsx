import { EditorialImage } from "@/components/editorial-image";

export function EditorialHero() {
  return (
    <header className="relative pt-8 sm:pt-16">
      <div className="flex items-start justify-between gap-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          lifestyle / traveling
        </p>
        <p className="hidden text-[11px] uppercase tracking-[0.35em] text-muted-foreground sm:block">
          travel hacks
        </p>
      </div>

      <div className="mt-12 sm:mt-20">
        <p className="mb-6 text-sm text-muted-foreground sm:text-base">
          Как спланировать отпуск и не разочароваться в поездке
        </p>

        <h1 className="relative max-w-4xl">
          <span
            className="block font-serif text-[clamp(3rem,12vw,8rem)] leading-[0.9] tracking-tight text-foreground/30"
            aria-hidden
          >
            Ненадёжные
          </span>
          <span
            className="relative -mt-[0.15em] block font-serif text-[clamp(3rem,12vw,8rem)] leading-[0.9] tracking-tight text-foreground"
          >
            надежды
          </span>
        </h1>

        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          иллюстрации: ваша поездка
        </p>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden sm:mt-10">
          <EditorialImage
            name="hero-collage"
            alt="Коллаж иллюстраций: аэропорт, карта, планирование поездки"
            priority
          />
        </div>
      </div>
    </header>
  );
}
