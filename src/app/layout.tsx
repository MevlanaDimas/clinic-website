import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from '@/components/Animations/PageTransition';
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"; // Import the new tracker
import ClientWidgetWrapper from "@/components/Widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Clinic",
    default: 'Clinic'
  },
  description: "Clinic Website",
};

// Removed 'async' and hooks from here
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`} suppressHydrationWarning>
          <PageTransition>
            {children}
          </PageTransition>
          <ClientWidgetWrapper />
          
          <Analytics />
          
          {/* Use the client-side tracker here */}
          {gaId && <GoogleAnalyticsTracker gaId={gaId} />}
        </body>
      </html>
    </ClerkProvider>
  );
}