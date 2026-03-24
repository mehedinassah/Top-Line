"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartContext";

type Props = {
  children: ReactNode;
};

export default function ThemeProviderWrapper({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}


