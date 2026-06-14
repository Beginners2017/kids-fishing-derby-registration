import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beginners Luck Tackle and Supply | Kids Fishing Derby Registration",
  description:
    "Simple online registration for the Beginners Luck Tackle and Supply Kids Fishing Derby."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
