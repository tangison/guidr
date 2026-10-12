"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { GuidrLockup } from "@/components/site/logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const NAV = [
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/planner", label: "Trip planner" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-operators", label: "For operators" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-line"
          : "bg-white border-b border-transparent"
      )}
    >
      {/* Brand bar: terracotta into mustard, sampled from the lockup artwork */}
      <div className="brand-bar w-full" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-700 rounded-sm"
          aria-label="Guidr home"
        >
          <GuidrLockup className="h-11 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] font-medium text-ink-700 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-700 rounded-sm",
                pathname.startsWith(item.href) && "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi Guidr, I have a question about a tour."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost hidden h-10 px-5 text-[15px] font-medium md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Ask on WhatsApp
          </a>
          {/* Planner CTA hidden on the planner itself */}
          {!pathname.startsWith("/planner") && (
            <Link
              href="/planner"
              className="btn btn-primary hidden h-10 px-5 text-[15px] sm:inline-flex"
            >
              Plan my trip
            </Link>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <button
              className="btn btn-ghost btn-icon lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </button>
            <SheetContent
              side="right"
              className="w-[300px] bg-white p-0 flex flex-col"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <GuidrLockup className="h-11 w-auto" />
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-3.5 text-[16px] font-medium text-ink-700 hover:bg-bone-50 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  className="rounded-md px-3 py-3.5 text-[16px] font-medium text-ink-700 hover:bg-bone-50 hover:text-ink"
                >
                  About
                </Link>
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-line p-5">
                <Link href="/planner" className="btn btn-primary btn-lg btn-block">
                  Plan my trip
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi Guidr, I have a question about a tour."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink btn-lg btn-block"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Ask on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
