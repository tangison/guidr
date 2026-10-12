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
      ? "btn-lg"
      : size === "sm"
        ? "btn-sm"
        : "btn-md";
  return (
    <a
      href={waLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "btn btn-ink",
        sizing,
        className
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
