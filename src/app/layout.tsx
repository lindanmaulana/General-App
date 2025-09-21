import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Header } from "./(home)/_components/Header";
import "./globals.css";
import SessionApp from "./session-app";


export const metadata: Metadata = {
  title: "General Official | Digitalisasi pengelolaan organisasi kampung",
  description: "Saatnya generasi kita bikin perubahan! Kolaborasi, inovasi, dan aksi nyata untuk kampung yang lebih maju",
  keywords: ["desa", "muncangela", "general", "cash flow"],
  alternates: {
    canonical: "https://general13.vercel.app",
    languages: {
      en: "https://general13.vercel.app"
    }
  },
  openGraph: {
    title: "General Official | Bersama membangun kampung yang lebih maju.",
    description: "General Official ialah sebuah organisasi kampung di desa muncangela, dan mencoba untuk mendigitalisasi pengelolaan keuangan internalnya.",
    images: "https://fake-store-beta-taupe.vercel.app/images/opengraph-image.png",
    url: "https://fake-store-beta-taupe.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "General Official | Bersama membangun kampung yang lebih maju.",
    description: "General Official ialah sebuah organisasi kampung di desa muncangela, dan mencoba untuk mendigitalisasi pengelolaan keuangan internalnya.",
    images: "https://fake-store-beta-taupe.vercel.app/images/opengraph-image.png",
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
        <ThemeProvider>
          <Header />
          <Toaster />
          <SessionApp>
            {children}
          </SessionApp>
        </ThemeProvider>
      </body>
    </html>
  );
}
