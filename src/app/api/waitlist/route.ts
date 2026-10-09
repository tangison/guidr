import { NextResponse } from "next/server";
import { z } from "zod";
import { addWaitlistEmail } from "@/lib/data";

const Body = z.object({
  email: z.string().email().max(200),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }
    await addWaitlistEmail(parsed.data.email.toLowerCase());
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("waitlist error", e);
    return NextResponse.json(
      { error: "Could not save that right now. Try again in a moment." },
      { status: 500 }
    );
  }
}
