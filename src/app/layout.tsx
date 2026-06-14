import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro Henrique | Software & Data Engineering",
  description: "Portfólio de Pedro Henrique: Engenharia de Software, Redes e Arquitetura de Dados. Transformando complexidade técnica em soluções escaláveis.",
  keywords: ["Engenharia de Software", "Engenharia de Dados", "Redes de Computadores", "DevOps", "Portfolio", "Pedro Henrique"],
  openGraph: {
    title: "Pedro Henrique | Blueprint Portfolio",
    description: "Explore projetos e arquiteturas em uma experiência interativa full-stack.",
    type: "website",
    locale: "pt_BR",
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
        {children}
      </body>
    </html>
  );
}
