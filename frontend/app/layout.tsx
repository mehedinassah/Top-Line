import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProviderWrapper from "@/components/layout/ThemeProviderWrapper";
import { ToastProvider } from "@/components/toast/ToastContext";
import ToastContainer from "@/components/toast/ToastContainer";

export const metadata: Metadata = {
  title: "Top Line - Premium Online Store",
  description:
    "Top Line is a modern premium online shopping platform for electronics, fashion, gadgets and lifestyle products.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <ToastProvider>
            <div className="min-h-screen flex flex-col bg-slate-950">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ToastContainer />
            </div>
          </ToastProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}


