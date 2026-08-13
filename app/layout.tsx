import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dehydrafoods.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "De'Hydra Foods | Industrial Food Ingredients",
    template: "%s | De'Hydra Foods",
  },
  description: "Premium dehydrated food ingredients manufactured in India for global food businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "De'Hydra Foods",
    title: "De'Hydra Foods | Industrial Food Ingredients",
    description: "Premium dehydrated food ingredients manufactured in India for global food businesses.",
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
