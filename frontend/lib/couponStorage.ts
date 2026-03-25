import { availableCoupons, type Coupon } from './productData';

const COUPON_STORAGE_KEY = 'topline_coupon_uses';

/**
 * Get the current state of all coupons from localStorage
 * If not in localStorage, returns the default coupons from productData
 */
export function getCouponsWithUpdatedUses(): Coupon[] {
  if (typeof window === 'undefined') {
    return availableCoupons;
  }

  try {
    const stored = localStorage.getItem(COUPON_STORAGE_KEY);
    if (!stored) {
      return availableCoupons;
    }

    // Parse the stored uses data
    const storedUses: Record<string, { currentUses: number }> = JSON.parse(stored);

    // Apply the stored uses to the coupons
    return availableCoupons.map(coupon => ({
      ...coupon,
      currentUses: storedUses[coupon.code]?.currentUses ?? coupon.currentUses
    }));
  } catch (error) {
    console.error('Failed to load coupon data from storage:', error);
    return availableCoupons;
  }
}

/**
 * Get a specific coupon with updated uses
 */
export function getCouponWithUpdatedUses(code: string): Coupon | undefined {
  const coupons = getCouponsWithUpdatedUses();
  return coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
}

/**
 * Increment the current uses of a coupon (when a purchase is made)
 */
export function incrementCouponUses(couponCode: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const coupons = getCouponsWithUpdatedUses();
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());

    if (!coupon) {
      console.warn(`Coupon ${couponCode} not found`);
      return;
    }

    // Get the current storage state
    let storedUses: Record<string, { currentUses: number }> = {};
    const stored = localStorage.getItem(COUPON_STORAGE_KEY);
    if (stored) {
      storedUses = JSON.parse(stored);
    }

    // Initialize if not present
    if (!storedUses[coupon.code]) {
      storedUses[coupon.code] = { currentUses: coupon.currentUses };
    }

    // Increment uses
    storedUses[coupon.code].currentUses += 1;

    // Save back to localStorage
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(storedUses));
  } catch (error) {
    console.error('Failed to update coupon uses:', error);
  }
}

/**
 * Reset coupon uses (for testing/debugging)
 */
export function resetCouponUses(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset coupon uses:', error);
  }
}
