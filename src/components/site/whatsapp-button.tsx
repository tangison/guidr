import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * WhatsApp CTA — ink fill with the glyph, per the design system.
 * (WhatsApp green is never used as a brand colour.)
 */
export function WhatsAppButton({
  message,
  phone,
  label = "Ask on WhatsApp",
  className,
  size = "default",
}: {
  message: string;
  phone?: string;
  label?: string;
  className?: string;
  size?: "default" | "lg" | "sm";
}) {
  const sizing =
    size === "lg"
      ? "h-12 px-6 text-[15px]"
      : size === "sm"
        ? "h-9 px-4 text-[13px]"
        : "h-11 px-5 text-[15px]";
  return (
    <a
      href={waLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-ink font-semibold text-white transition-colors hover:bg-ink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-700",
        sizing,
        className
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
