import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "./analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Романенко учит — Telegram-боты, Django и FastAPI для школьников",
  description:
    "Школа Владимира Романенко: учим школьников 12–18 писать Telegram-ботов и веб‑приложения на Django и FastAPI. Онлайн, группы и индивидуально.",
  metadataBase: new URL("https://romanenkouchit.ru"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Романенко учит — обучение разработке Telegram-ботов и веб‑приложений",
    description:
      "Практика на реальных проектах: Python, Django, FastAPI, Next.js. Онлайн формат.",
    url: "https://romanenkouchit.ru",
    siteName: "Романенко учит",
    images: [
      { url: "/og", width: 1200, height: 630, alt: "Романенко учит" },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
