import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solaris",
  metadataBase: new URL("https://hacksolaris.com"),
  keywords: [
    "Solaris",
    "HackSolaris",
    "New Jersey Hackathons",
    "2025 New Jersey Hackathons",
    "New Jersey High School Hackathons",
    "High School Hackathons in New Jersey",
    "Hackathon",
    "New Jersey",
    "High School Hackathon",
  ],
  description:
    "The only 24-hour in-person high school hackathon in New Jersey to build projects to space",
  icons: [
    {
      rel: "icon",
      url: "/icon-light.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icon-dark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
