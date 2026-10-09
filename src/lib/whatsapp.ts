/**
 * WhatsApp-first helpers. Click-to-chat links everywhere.
 * The number is a placeholder until the business line is confirmed [VERIFY].
 */
export const WHATSAPP_NUMBER = "264811234567";

export function waLink(message: string, phone: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function waExperienceMessage(title: string, slug: string) {
  return `Hi Guidr, I'm interested in "${title}" (${slug}). Could you tell me more?`;
}
