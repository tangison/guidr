import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getguidr.com"),
  title: {
    default: "Guidr: Guided tours and activities in Namibia",
    template: "%s · Guidr",
  },
  description:
    "Guided Namibia tours from local operators. Honest prices, WhatsApp-first booking. Launching at the coast: Swakopmund and Walvis Bay.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Namibia tours",
    "Swakopmund activities",
    "Walvis Bay tours",
    "Sossusvlei",
    "guided tours",
    "Etosha safari",
    "Namibia travel",
  ],
  authors: [{ name: "Guidr" }],
  openGraph: {
    title: "Guidr: Guided tours and activities in Namibia",
    description:
      "Guided Namibia tours from local operators. Honest prices, WhatsApp-first booking. Launching at the coast: Swakopmund and Walvis Bay.",
    url: "https://getguidr.com",
    siteName: "Guidr",
    type: "website",
    locale: "en_NA",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Guidr: Namibia, guided properly. Curated local operators, honest prices, WhatsApp-first booking.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guidr: Guided tours and activities in Namibia",
    description:
      "Curated local operators, honest prices, WhatsApp-first booking.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ECEAE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-clip`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
