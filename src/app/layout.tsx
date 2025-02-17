import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Header />
          <div className="px-4 sm:px-16 md:px-32 lg:px-48 xl:px-64">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
