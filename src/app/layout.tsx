import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

import { Recursive } from "next/font/google";
import { constructMetaData } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={recursive.className}>
          <Navbar />

          <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex-1 flex flex-col h-full">{children}</div>
            <Footer />
          </main>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
