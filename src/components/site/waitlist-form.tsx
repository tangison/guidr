"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p
        className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-[15px] text-white"
        role="status"
      >
        <Check className="h-5 w-5 text-mustard" aria-hidden="true" />
        You are on the list. We will message you the day it ships.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@example.com"
          aria-describedby={state === "error" ? "waitlist-error" : undefined}
          className="h-12 w-full rounded-md bg-white border border-transparent px-4 text-[15px] text-ink placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-mustard"
        />
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-mustard px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-sand disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Join the waitlist
      </button>
      {state === "error" && (
        <p id="waitlist-error" className="text-[13px] text-white/80 sm:absolute sm:-bottom-6">
          That email does not look right. Try again?
        </p>
      )}
    </form>
  );
}
