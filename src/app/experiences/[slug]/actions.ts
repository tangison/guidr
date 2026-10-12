"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createBookingRequest } from "@/lib/data";

const RequestSchema = z.object({
  experienceId: z.string().min(1).max(64),
  experienceSlug: z.string().min(1).max(128),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date.")
    .refine((d) => {
      const dt = new Date(`${d}T00:00:00`);
      return !Number.isNaN(dt.getTime()) && dt >= new Date(new Date().toDateString());
    }, "That date is in the past."),
  guests: z.coerce.number().int().min(1).max(20),
  travellerName: z.string().trim().min(2, "Your name is needed.").max(120),
  travellerEmail: z.string().trim().email("A valid email is needed.").max(200),
  travellerWhatsapp: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type RequestState =
  | { ok: true; ref: string }
  | { ok: false; error: string }
  | null;

export async function requestBooking(
  _prev: RequestState,
  formData: FormData
): Promise<RequestState> {
  const parsed = RequestSchema.safeParse({
    experienceId: formData.get("experienceId"),
    experienceSlug: formData.get("experienceSlug"),
    date: formData.get("date"),
    guests: formData.get("guests"),
    travellerName: formData.get("travellerName"),
    travellerEmail: formData.get("travellerEmail"),
    travellerWhatsapp: formData.get("travellerWhatsapp") ?? "",
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      ok: false,
      error: first?.message ?? "Check the form and try again.",
    };
  }

  const d = parsed.data;
  const booking = await createBookingRequest({
    experienceId: d.experienceId,
    travellerName: d.travellerName,
    travellerEmail: d.travellerEmail,
    travellerWhatsapp: d.travellerWhatsapp || undefined,
    date: d.date,
    guests: d.guests,
    notes: d.notes || undefined,
  });

  // On serverless hosting the write and the redirect can land on different
  // instances, so the confirmation page may not find the booking in its own
  // database yet. A short-lived receipt cookie lets it render the
  // confirmation from the request itself. The cookie is httpOnly, carries
  // only the traveller's own booking data, and expires in 15 minutes.
  const exp = booking.experience;
  const jar = await cookies();
  jar.set(
    "gdr_receipt",
    JSON.stringify({
      ref: booking.ref,
      status: booking.status,
      travellerEmail: booking.travellerEmail,
      date: booking.date,
      guests: booking.guests,
      notes: booking.notes,
      totalPriceMinor: booking.totalPriceMinor,
      currency: booking.currency,
      experience: {
        slug: exp.slug,
        title: exp.title,
        durationMinutes: exp.durationMinutes,
        meetingPoint: exp.meetingPoint,
        operator: { name: exp.operator.name, whatsapp: exp.operator.whatsapp },
      },
    }),
    { httpOnly: true, sameSite: "lax", maxAge: 900, path: "/" }
  );

  redirect(`/bookings/${booking.ref}?sent=1`);
}
