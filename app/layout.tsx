import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { Toaster } from "@/components/ui/toaster";
import QCP from "./lib/Providers";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />
        <main className="flex grainy-light  flex-col min-h-[calc(100vh-3.5rem-5px)]">
          <QCP>
            <div className="flex-1 h-full flex flex-col">{children}</div>
          </QCP>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
