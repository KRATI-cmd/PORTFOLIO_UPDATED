import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Portfolio of Krati Joshi, a backend engineer building secure, fast APIs and event-driven systems with Node.js, TypeScript, PostgreSQL, and Kafka.";

export const metadata: Metadata = {
  title: {
    default: "Krati Joshi | Backend Engineer",
    template: "%s | Krati Joshi",
  },
  description,
  keywords: [
    "Krati Joshi",
    "Backend Engineer",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Kafka",
    "Microservices",
    "REST APIs",
  ],
  authors: [{ name: "Krati Joshi" }],
  creator: "Krati Joshi",
  openGraph: {
    type: "website",
    title: "Krati Joshi | Backend Engineer",
    description,
    siteName: "Krati Joshi",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krati Joshi | Backend Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#060B14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
