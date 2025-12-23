import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GYMM | Profesyonel Fitness & Spor Salonu",
  description: "GYMM - Modern ekipmanlar, uzman antrenorler ve motive edici ortamla fitness hedeflerinize ulasin.",
  keywords: "spor salonu, fitness, gym, agirlik, cardio, kisisel antrenman, yoga, pilates, crossfit, istanbul",
  openGraph: {
    title: "GYMM | Profesyonel Fitness & Spor Salonu",
    description: "Modern ekipmanlar, uzman antrenorler ve motive edici ortamla fitness hedeflerinize ulasin.",
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
