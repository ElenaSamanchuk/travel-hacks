import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-instrument-serif",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Travel Hacks — чеклист путешественника",
  description:
    "Интерактивный чеклист и лайфхаки: как спланировать отпуск, не разочароваться и путешествовать с удовольствием.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
