import type { Metadata } from "next";
import "./globals.css";
import StoreChrome from "@/components/layout/StoreChrome";
import ThemeProviderWrapper from "@/components/layout/ThemeProviderWrapper";
import { ToastProvider } from "@/components/toast/ToastContext";
import { CartProvider } from "@/components/cart/CartContext";
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
          <CartProvider>
            <ToastProvider>
              <StoreChrome>{children}</StoreChrome>
              <ToastContainer />
            </ToastProvider>
          </CartProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}


