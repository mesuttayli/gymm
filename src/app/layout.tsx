import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GYMM | Profesyonel Fitness & Spor Salonu",
  description: "GYMM - Modern ekipmanlar, uzman antrenorler ve motive edici ortamla fitness hedeflerinize ulasin. Agirlik calismalari, cardio, grup dersleri ve kisisel antrenman.",
  keywords: "spor salonu, fitness, gym, agirlik, cardio, kisisel antrenman, yoga, pilates, crossfit, istanbul",
  authors: [{ name: "GYMM" }],
  openGraph: {
    title: "GYMM | Profesyonel Fitness & Spor Salonu",
    description: "Modern ekipmanlar, uzman antrenorler ve motive edici ortamla fitness hedeflerinize ulasin.",
    type: "website",
    locale: "tr_TR",
    siteName: "GYMM",
  },
  twitter: {
    card: "summary_large_image",
    title: "GYMM | Profesyonel Fitness & Spor Salonu",
    description: "Modern ekipmanlar, uzman antrenorler ve motive edici ortamla fitness hedeflerinize ulasin.",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="tr" className="scroll-smooth">
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
