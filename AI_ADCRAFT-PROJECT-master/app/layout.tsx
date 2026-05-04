import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingElements } from "@/components/FloatingElements";
import { HelpChatbox } from "@/components/HelpChatbox";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ad-Vision AI - AI-Powered Ad Creation Platform",
  description: "Automate the creation of personalized advertisements using Artificial Intelligence. Generate customized ad copies, visuals, and templates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <AuthProvider>
            <AnimatedBackground />
            <FloatingElements />
            <Navbar />
            <Sidebar />
            <main className="min-h-screen flex flex-col">
              {children}
            </main>
            <Footer />
            <HelpChatbox />
            <Toaster position="top-right" />
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
