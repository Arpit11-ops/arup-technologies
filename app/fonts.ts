import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});
