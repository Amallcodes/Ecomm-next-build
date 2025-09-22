import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/navbar";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "E-com",
  description: "Created by the Vartecc dev team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
