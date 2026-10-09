import Link from "next/link";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { GuidrWordmark, FootprintTrail } from "@/components/site/logo";
import { WHATSAPP_NUMBER, waLink } from "@/lib/whatsapp";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Destinations" },
      { href: "/experiences", label: "Experiences" },
      { href: "/experiences?category=adventure", label: "Adventure" },
      { href: "/experiences?category=wildlife", label: "Wildlife" },
      { href: "/experiences?category=stargazing", label: "Stargazing" },
    ],
  },
  {
    title: "Guidr",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/planner", label: "AI trip planner" },
      { href: "/for-operators", label: "For operators" },
      { href: "/about", label: "About" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of use" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/cancellation", label: "Cancellation" },
      { href: "/legal/operator-agreement", label: "Operator agreement" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <GuidrWordmark className="h-8 w-auto" color="#FFFFFF" />
            <FootprintTrail
              className="my-6 h-4"
              color="var(--mustard)"
            />
            <p className="text-[15px] leading-relaxed text-white/70">
              The friendly local alternative to global booking sites. Curated
              Namibian operators, honest prices, and a WhatsApp message away
              from your next guide.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Guidr, I have a question about a tour."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Chat with Guidr on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/getguidr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Guidr on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/getguidr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Guidr on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-white/50 mb-5">{col.title}</h3>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} Guidr. All rights reserved. Launching
            at the coast — Swakopmund and Walvis Bay.
          </p>
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-white/55 hover:text-white/80 transition-colors"
          >
            Built by Tangison Studio
            <img
              src="/brand/tangison-light.png"
              alt=""
              width={20}
              height={20}
              className="opacity-70"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
