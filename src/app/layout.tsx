import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/cabinet-grotesk/CabinetGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
});

export const metadata: Metadata = {
  title: "Jesko Jets | The Future of Flight",
  description: "A high-end cinematic landing page for Jesko Jets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} h-full antialiased`}
    >
      <body className={`${cabinetGrotesk.className} min-h-full flex flex-col bg-background text-foreground`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
