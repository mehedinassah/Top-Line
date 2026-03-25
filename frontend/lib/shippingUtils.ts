// Shipping constants and utilities
export type DeliveryLocation = "dhaka" | "outside-dhaka";

export interface ShippingCost {
  amount: number;
  isFree: boolean;
  location: DeliveryLocation;
}

// Free shipping threshold: orders above 2000 taka get free shipping
const FREE_SHIPPING_THRESHOLD = 2000;

// Shipping costs
const DHAKA_SHIPPING_COST = 60;
const OUTSIDE_DHAKA_SHIPPING_COST = 100;

/**
 * Calculate shipping cost based on cart subtotal and delivery location
 * Free shipping for orders above 2000 taka
 * Inside Dhaka: 60 taka, Outside Dhaka: 100 taka
 */
export function calculateShipping(
  subtotal: number,
  location: DeliveryLocation = "dhaka"
): ShippingCost {
  // Check if order qualifies for free shipping
  if (subtotal > FREE_SHIPPING_THRESHOLD) {
    return {
      amount: 0,
      isFree: true,
      location
    };
  }

  // Standard shipping costs
  const amount =
    location === "dhaka"
      ? DHAKA_SHIPPING_COST
      : OUTSIDE_DHAKA_SHIPPING_COST;

  return {
    amount,
    isFree: false,
    location
  };
}

/**
 * Get shipping cost for display text
 */
export function getShippingText(shipping: ShippingCost): string {
  if (shipping.isFree) {
    return "FREE";
  }
  return `৳${shipping.amount}`;
}

/**
 * Format location for display
 */
export function getLocationText(location: DeliveryLocation): string {
  return location === "dhaka" ? "Inside Dhaka" : "Outside Dhaka";
}
