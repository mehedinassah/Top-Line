"use client";

import { useEffect, useState } from "react";

/**
 * Hook that ensures a component only renders on the client after hydration is complete.
 * Used to prevent hydration mismatches for interactive elements.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
