import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientBody from "@/app/ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internet Speed Checker - Test Your Connection",
  description: "Quick and easy tool to test your internet download and upload speeds",
  keywords: ["internet speed", "speed test", "bandwidth", "connection test", "download speed", "upload speed"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
