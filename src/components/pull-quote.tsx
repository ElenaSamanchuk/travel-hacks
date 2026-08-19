type PullQuoteProps = {
  children: React.ReactNode;
  mark?: string;
};

export function PullQuote({ children, mark = "!" }: PullQuoteProps) {
  return (
    <aside className="my-12 flex gap-5 sm:my-16 sm:gap-8">
      <span
        className="shrink-0 font-serif text-5xl leading-none text-foreground sm:text-7xl"
        aria-hidden
      >
        {mark}
      </span>
      <p className="font-serif text-xl leading-relaxed sm:text-2xl md:text-3xl">
        {children}
      </p>
    </aside>
  );
}
