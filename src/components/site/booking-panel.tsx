"use client";

import * as React from "react";
import { CalendarDays, Users, Loader2, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { requestBooking, type RequestState } from "@/app/experiences/[slug]/actions";
import { useFormStatus } from "react-dom";

type PanelProps = {
  experienceId: string;
  experienceSlug: string;
  title: string;
  currency: string;
  priceMinor: number;
  childPriceMinor: number | null;
  responseTime: string;
  policyLabel: string;
  waMessage: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {pending ? "Sending request…" : "Send request"}
    </button>
  );
}

function BookingForm({ props, date, guests }: { props: PanelProps; date: string; guests: number }) {
  const [state, formAction] = React.useActionState<RequestState, FormData>(
    requestBooking,
    null
  );

  const inputClass =
    "h-12 w-full rounded-md border border-line bg-bone-50 px-4 text-[15px] text-ink placeholder:text-ink-500 focus:outline-none focus:border-terracotta-700 focus:ring-2 focus:ring-terracotta-50";

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="experienceId" value={props.experienceId} />
      <input type="hidden" name="experienceSlug" value={props.experienceSlug} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="guests" value={guests} />

      <div className="grid gap-1.5">
        <label htmlFor="travellerName" className="text-[14px] font-medium text-ink">
          Your name
        </label>
        <input id="travellerName" name="travellerName" required autoComplete="name" className={inputClass} placeholder="e.g. Anna Swart" />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="travellerEmail" className="text-[14px] font-medium text-ink">
          Email
        </label>
        <input id="travellerEmail" name="travellerEmail" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
        <p className="text-[13px] text-ink-500">The confirmation and voucher go here.</p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="travellerWhatsapp" className="text-[14px] font-medium text-ink">
          WhatsApp number <span className="font-normal text-ink-500">(optional)</span>
        </label>
        <input id="travellerWhatsapp" name="travellerWhatsapp" type="tel" autoComplete="tel" className={inputClass} placeholder="+264 …" />
        <p className="text-[13px] text-ink-500">
          The operator replies on WhatsApp — the fastest path to a yes.
        </p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="notes" className="text-[14px] font-medium text-ink">
          Notes for the operator <span className="font-normal text-ink-500">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={2000}
          className="custom-scroll w-full resize-none rounded-md border border-line bg-bone-50 px-4 py-3 text-[15px] text-ink placeholder:text-ink-500 focus:outline-none focus:border-terracotta-700 focus:ring-2 focus:ring-terracotta-50"
          placeholder="Pickup question, dietary needs, kids' ages…"
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="rounded-md bg-terracotta-50 px-4 py-3 text-[14px] text-danger">
          {state.error}
        </p>
      )}

      <SubmitButton />

      <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-500">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        A request is not a commitment. The operator confirms first; you pay
        them directly afterwards.
      </p>
    </form>
  );
}

export function BookingPanel(props: PanelProps) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = React.useState("");
  const [guests, setGuests] = React.useState(2);
  const [open, setOpen] = React.useState(false);

  const adultTotal = props.priceMinor * guests;
  const valid = date !== "";

  return (
    <div className="rounded-xl border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[26px] font-bold text-ink tabular">
          {formatPrice(props.priceMinor, props.currency)}
          <span className="ml-1 text-[13px] font-normal text-ink-500">per person</span>
        </p>
      </div>
      {props.childPriceMinor && (
        <p className="mt-1 text-[13px] text-ink-500 tabular">
          Children from {formatPrice(props.childPriceMinor, props.currency)}
        </p>
      )}
      <p className="mt-2 text-[13px] text-ink-500">
        {props.responseTime} · {props.policyLabel} cancellation
      </p>

      <div className="mt-5 space-y-3">
        <label className="flex h-12 items-center gap-3 rounded-md border border-line bg-bone-50 px-4 focus-within:border-terracotta-700 focus-within:ring-2 focus-within:ring-terracotta-50">
          <CalendarDays className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Date</span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-[15px] text-ink focus:outline-none"
          />
        </label>
        <label className="flex h-12 items-center gap-3 rounded-md border border-line bg-bone-50 px-4 focus-within:border-terracotta-700 focus-within:ring-2 focus-within:ring-terracotta-50">
          <Users className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
          <span className="sr-only">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full cursor-pointer appearance-none bg-transparent text-[15px] text-ink focus:outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <dl className="mt-5 space-y-2 border-t border-line pt-5 text-[14px]">
        <div className="flex justify-between text-ink-700">
          <dt>
            {formatPrice(props.priceMinor, props.currency)} × {guests}{" "}
            {guests === 1 ? "guest" : "guests"}
          </dt>
          <dd className="tabular">{formatPrice(adultTotal, props.currency)}</dd>
        </div>
        <div className="flex justify-between font-semibold text-ink">
          <dt>Total estimate</dt>
          <dd className="tabular">{formatPrice(adultTotal, props.currency)}</dd>
        </div>
        <p className="pt-1 text-[13px] text-ink-500">
          Final price is set by the operator when they confirm. Guidr never
          holds your money — you pay the operator directly.
        </p>
      </dl>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            disabled={!valid}
            aria-disabled={!valid}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-terracotta px-6 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Request to book
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[92vh] overflow-y-auto custom-scroll sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-left text-[22px] font-bold text-ink">
              Request to book
            </DialogTitle>
            <DialogDescription className="text-left text-[14px] leading-relaxed text-ink-700">
              {props.title} — {guests} {guests === 1 ? "guest" : "guests"}
              {date ? `, ${date}` : ""}. The operator confirms within 24 hours,
              then you arrange payment directly with them.
            </DialogDescription>
          </DialogHeader>
          <BookingForm props={props} date={date} guests={guests} />
        </DialogContent>
      </Dialog>

      {!valid && (
        <p className="mt-2 text-center text-[13px] text-ink-500">
          Pick a date to continue.
        </p>
      )}

      <div className="mt-3">
        <WhatsAppButton
          message={props.waMessage}
          className="w-full"
        />
      </div>
    </div>
  );
}
