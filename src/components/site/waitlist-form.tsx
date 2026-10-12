"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const emailRef = React.useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      emailRef.current?.focus();
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
      emailRef.current?.focus();
    }
  }

  if (state === "done") {
    return (
      <p
        className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[15px] text-white"
        role="status"
      >
        <Check className="h-5 w-5 text-white" aria-hidden="true" />
        You are on the list. We will message you the day it ships.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input
          ref={emailRef}
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@example.com"
          aria-describedby={state === "error" ? "waitlist-error" : undefined}
          aria-invalid={state === "error"}
          className="h-12 w-full rounded-full bg-white border border-transparent px-5 text-[15px] text-ink placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary btn-lg btn-on-dark"
      >
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Join the waitlist
      </button>
      {state === "error" && (
        <p
          id="waitlist-error"
          role="alert"
          className="text-[13px] text-white/80 sm:absolute sm:-bottom-6"
        >
          That email does not look right. Try again?
        </p>
      )}
    </form>
  );
}
