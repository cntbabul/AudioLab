import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/client";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Audio Lab",
    template: "%s | Audio Lab"
  },
  description: "Audio Lab by cntbabul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col overflow-hidden scrollbar-hide bg-background">
        <ClerkProvider>
          <TRPCReactProvider>
            <TooltipProvider>
              <main className="flex-1 overflow-y-auto scrollbar-hide">
                {children}
              </main>
              <Toaster />
            </TooltipProvider>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
