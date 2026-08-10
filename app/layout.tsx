import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dehydrafoods.com"),
  title: { default: "De'Hydra Foods | Dehydrated Food Ingredients", template: "%s | De'Hydra Foods" },
  description: "Premium dehydrated potato, onion and garlic ingredients manufactured in India for global food businesses.",
  keywords: ["dehydrated food ingredients", "potato flakes manufacturer", "dehydrated onion exporter", "food ingredients India"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "De'Hydra Foods", title: "De'Hydra Foods | Dehydrated Food Ingredients", description: "Reliable dehydrated ingredients for food manufacturers worldwide.", url: "https://dehydrafoods.com", images: [{ url: "/images/home-1.png", width: 1600, height: 900, alt: "De'Hydra Foods manufacturing facility" }] },
  twitter: { card: "summary_large_image", title: "De'Hydra Foods | Dehydrated Food Ingredients", description: "Reliable dehydrated ingredients for food manufacturers worldwide.", images: ["/images/home-1.png"] },
  icons: { icon: "/images/company-long-logo.png" },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "De'Hydra Foods", url: "https://dehydrafoods.com", logo: "https://dehydrafoods.com/images/company-long-logo.png", description: "Manufacturer and exporter of dehydrated food ingredients from India." }, { "@type": "WebSite", name: "De'Hydra Foods", url: "https://dehydrafoods.com" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${poppins.variable}`}><body><Header /><main>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></body></html>;
}
