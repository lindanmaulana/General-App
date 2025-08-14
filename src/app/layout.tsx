import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Header } from "./(home)/_components/Header";
import "./globals.css";
import SessionApp from "./session-app";


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
        className={`antialiased`}
      >
        <Header />
        <Toaster />
        <SessionApp>
          {children}
        </SessionApp>
      </body>
    </html>
  );
}
