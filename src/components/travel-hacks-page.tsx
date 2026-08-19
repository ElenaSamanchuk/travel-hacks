"use client";

import { EditorialHero } from "@/components/editorial-hero";
import { HoverChecklist } from "@/components/hover-checklist";
import { PullQuote } from "@/components/pull-quote";
import {
  planningScatter,
  spontaneousScatter,
} from "@/data/checklist-layout";
import { travelHacks } from "@/data/travel-hacks";
import { withBasePath } from "@/lib/base-path";

const planningHacks = travelHacks.filter((h) => h.category === "planning");
const spontaneousHacks = travelHacks.filter((h) => h.category === "spontaneous");

export function TravelHacksPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-foreground editorial-body">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <EditorialHero />

        <article className="mt-12 space-y-6 text-base leading-[1.75] sm:mt-16 sm:text-lg">
          <p>
            «Можно забронировать всё, кроме идеального момента», — пишет
            Андрей Григорьев-Апполонов. С ним едва ли согласятся тысячи людей,
            которые прямо сейчас ждут вылета в аэропорту или только планируют
            путешествие: долгожданные каникулы просто обязаны сделать нас
            счастливыми.
          </p>
          <p>
            Как сделать, чтобы эти ожидания оправдались? Мы собрали план
            действий на любой сценарий: планируете отпуск за полгода, собираетесь
            спонтанно или вовсе не разделяете работу и жизнь.
          </p>
        </article>

        <section className="mt-14 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl">В ожидании чуда</h2>
          <div className="mt-6 space-y-6 text-base leading-[1.75] sm:text-lg">
            <p>
              «Я предпочитаю полностью планировать отпуск за три-четыре
              месяца, — рассказывает Кирилл Коваленко. — Например, я собираюсь
              в Париж в середине октября и у меня уже расписан календарь
              посещения всех новых выставок, ужинов в ресторанах и так далее».
            </p>
            <p>
              Ключевое для него — спокойствие и предвкушение. «В реальности
              идеального шторма хочется предсказуемости, что ли». И он далеко не
              одинок: раннее планирование даёт больше свободы, чем сложнее
              путешествие, тем важнее заранее забронировать нужные даты.
            </p>
          </div>
        </section>

        <PullQuote>
          Отпуск перестаёт быть отдыхом и становится инвестиционным проектом
        </PullQuote>

        <div className="space-y-6 text-base leading-[1.75] sm:text-lg">
          <p>
            У проекта есть цели, показатели эффективности и дедлайны. У паузы —
            только одно назначение: дать психике пространство, в котором ничего
            не требуется производить, включая впечатления и контент.
          </p>
          <p>
            И чем больше времени, денег и прочих ресурсов затрачено на
            планирование, тем выше внутренняя ставка ожиданий. Психика начинает
            сравнивать полученное с ожидаемым — и в этом сравнении реальность
            почти всегда проигрывает.
          </p>
        </div>

        <HoverChecklist
          hacks={planningHacks}
          positions={planningScatter}
          title="Чек-лист, чтобы планировать с удовольствием и реже разочаровываться"
          backgroundImage={withBasePath("/images/planning-scatter.png")}
          backgroundAlt="Иллюстрация: планирование отпуска"
        />

        <section className="mt-8 sm:mt-12">
          <h2 className="font-serif text-2xl sm:text-3xl">Маршрут не построен</h2>
          <div className="mt-6 space-y-6 text-base leading-[1.75] sm:text-lg">
            <p>
              Если все лайфхаки выше вами уже испробованы, но запланировать
              идеальный отпуск всё же не получается — не планируйте. Это ещё
              одна популярная отпускная стратегия, которая может сработать.
            </p>
            <p>
              Спонтанные путешественники ищут в непредсказуемости ощущение
              жизни. Ещё один плюс — отсутствие завышенных ожиданий: вы их
              просто не успеете сформировать.
            </p>
          </div>
        </section>

        <PullQuote mark="!">
          если вам удалось провернуть одну идеальную спонтанную поездку, не факт
          что подобный успех повторится
        </PullQuote>

        <div className="space-y-6 text-base leading-[1.75] sm:text-lg">
          <p>
            Отсюда вытекает первый совет для начинающих авантюристов:
            запланируйте хотя бы что-то. Можно определиться с целью путешествия,
            наметить несколько мест или просто забронировать первый отель.
          </p>
        </div>

        <HoverChecklist
          hacks={spontaneousHacks}
          positions={spontaneousScatter}
          title="Правила для классных спонтанных путешествий"
          hint="Наведите на цифру — или нажмите на мобильном"
          backgroundImage={withBasePath("/images/spontaneous-scatter.png")}
          backgroundAlt="Иллюстрация: спонтанное путешествие"
        />

        <footer className="mt-20 border-t border-foreground/10 py-10 text-center text-xs tracking-wide text-muted-foreground">
          Чеклист путешественника · соберите свой набор правил перед поездкой
        </footer>
      </div>
    </div>
  );
}
