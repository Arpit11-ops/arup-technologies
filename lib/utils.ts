import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const WHATSAPP_NUMBER = "TODO_WHATSAPP_NUMBER";

function encodeWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = encodeWhatsAppUrl(
  "Hi Arup — I'd like to talk about my digital stack.",
);

export function whatsappHrefFor(message: string) {
  return encodeWhatsAppUrl(message);
}

export const CONTACT_EMAIL = "hello@aruptechnologies.com";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}
