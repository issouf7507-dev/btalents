// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientProviderComponent } from "@/components/providers/queryClientProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Btalents ",
  description: "Btalents is a platform for finding and hiring talents",
};

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >

        <QueryClientProviderComponent>

          <SmoothScroll />

          {children}
        </QueryClientProviderComponent>

      </body>
    </html>
  );
}


