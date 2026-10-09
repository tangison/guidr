"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Send, RotateCcw, Clock } from "lucide-react";
import { FootprintIcon } from "@/components/site/logo";
import { formatDuration } from "@/lib/format";

type Card = {
  slug: string;
  title: string;
  destination: string;
  durationMinutes: number;
  priceMinor: number;
  currency: string;
  summary: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
  isDemo: boolean;
};

type Msg = { role: "user" | "assistant"; content: string; cards?: Card[] };

const SUGGESTIONS = [
  "Plan 3 days at the coast for a family of four with a N$ 4,000 per person budget.",
  "Two quiet days around Sossusvlei for a couple who like walking and photography.",
  "A first-time visitor has one week in Namibia — what should not be missed?",
];

export function PlannerChat() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(history);
    setInput("");
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.slice(-20).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "failed");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "",
          cards: Array.isArray(data.cards) ? data.cards : [],
        },
      ]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[560px] flex-col rounded-xl border border-line bg-white overflow-hidden">
      <div
        className="custom-scroll flex-1 space-y-5 overflow-y-auto p-5 sm:p-7 lg:max-h-[560px]"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-50">
              <FootprintIcon className="h-7 w-auto" color="var(--terracotta)" />
            </span>
            <h2 className="mt-4 text-[20px] font-semibold text-ink">
              Where to, and for how long?
            </h2>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-500">
              The planner only recommends real catalogue experiences with
              honest prices. Start with your dates, your people and your pace.
            </p>
            <div className="mt-6 w-full max-w-md space-y-2.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full rounded-md border border-line bg-bone-50 px-4 py-3 text-left text-[14px] leading-relaxed text-ink-700 transition-colors hover:border-line-strong hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-lg rounded-br-sm bg-terracotta-50 px-4 py-3 text-[14px] leading-relaxed text-ink">
                {m.content}
              </p>
            </div>
          ) : (
            <div key={i} className="space-y-3">
              <div className="flex gap-3">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
                  <FootprintIcon className="h-4 w-auto" color="var(--mustard)" />
                </span>
                <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-bone-50 px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap text-ink">
                  {m.content}
                </p>
              </div>
              {m.cards && m.cards.length > 0 && (
                <div className="grid gap-3 pl-11 sm:grid-cols-2">
                  {m.cards.map((card) => (
                    <Link
                      key={card.slug}
                      href={`/experiences/${card.slug}`}
                      className="group overflow-hidden rounded-lg border border-line bg-white transition-all hover:border-line-strong hover:shadow-e2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={card.heroImage}
                          alt={card.summary}
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                        {card.isDemo && (
                          <span className="absolute left-2.5 top-2.5 rounded-sm bg-white/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-700">
                            Demo
                          </span>
                        )}
                      </div>
                      <div className="p-3.5">
                        <p className="eyebrow text-terracotta-700">
                          {card.destination}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
                          {card.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[12px] text-ink-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {formatDuration(card.durationMinutes)}
                          </span>
                          <span className="tabular font-semibold text-ink">
                            from N$ {Math.round(card.priceMinor / 100)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {loading && (
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
              <FootprintIcon className="h-4 w-auto" color="var(--mustard)" />
            </span>
            <span className="flex items-center gap-2 text-[14px] text-ink-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Reading the catalogue…
            </span>
          </div>
        )}

        {failed && (
          <div className="rounded-md border border-line bg-terracotta-50 p-4 text-[14px] text-ink">
            <p className="font-medium">The planner is having a moment.</p>
            <p className="mt-1 text-ink-700">
              Try sending your message again. If it keeps failing, message us
              on WhatsApp and we will plan it with you.
            </p>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-4 sm:p-5"
      >
        <div className="flex items-end gap-2.5">
          <label className="flex-1">
            <span className="sr-only">Message the planner</span>
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="e.g. Three days at the coast in July, two adults, easy pace…"
              className="custom-scroll w-full resize-none rounded-md border border-line bg-bone-50 px-4 py-3 text-[15px] text-ink placeholder:text-ink-500 focus:outline-none focus:border-terracotta-700 focus:ring-2 focus:ring-terracotta-50"
            />
          </label>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-terracotta text-white transition-colors hover:bg-terracotta-700 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
            aria-label="Send message"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-ink-500 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Start over
          </button>
        )}
      </form>
    </div>
  );
}
