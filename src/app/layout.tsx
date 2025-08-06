import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SessionApp from "./session-app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digitalisasi pengelolaan organisasi kampung - GENERAL",
  description: "Saatnya generasi kita bikin perubahan! Kolaborasi, inovasi, dan aksi nyata untuk kampung yang lebih maju - GENERAL",
  alternates: {
    canonical: "https://general13.vercel.app",
    languages: {
      en: "https://general13.vercel.app"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <SessionApp>
          {children}
        </SessionApp>
      </body>
    </html>
  );
}
