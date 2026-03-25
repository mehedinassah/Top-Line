import { availableCoupons, type Coupon } from './productData';
import { getCouponsWithUpdatedUses } from './couponStorage';

export interface CouponValidationResult {
  valid: boolean;
  coupon: Coupon | null;
  error: string | null;
  discount: number;
}

/**
 * Validate a coupon code and calculate the discount
 */
export function validateCoupon(
  code: string,
  subtotal: number
): CouponValidationResult {
  const couponCode = code.trim().toUpperCase();

  // Get coupons with updated uses from storage
  const coupons = getCouponsWithUpdatedUses();

  // Find the coupon
  const coupon = coupons.find(
    c => c.code.toUpperCase() === couponCode
  );

  console.log('🔍 Validating coupon:', {
    inputCode: code,
    trimmedUppercase: couponCode,
    foundCoupon: coupon?.code || 'NOT FOUND',
    availableCodes: coupons.map(c => c.code)
  });

  if (!coupon) {
    return {
      valid: false,
      coupon: null,
      error: 'Coupon code not found',
      discount: 0
    };
  }

  // Check if coupon is active
  if (!coupon.active) {
    return {
      valid: false,
      coupon: null,
      error: 'This coupon is no longer active',
      discount: 0
    };
  }

  // Check expiry date
  const today = new Date();
  const expiryDate = new Date(coupon.expiryDate);
  if (today > expiryDate) {
    return {
      valid: false,
      coupon: null,
      error: 'This coupon has expired',
      discount: 0
    };
  }

  // Check if max uses reached
  if (coupon.currentUses >= coupon.maxUses) {
    return {
      valid: false,
      coupon: null,
      error: 'This coupon has reached its usage limit',
      discount: 0
    };
  }

  // Check minimum purchase amount
  if (subtotal < coupon.minPurchaseAmount) {
    return {
      valid: false,
      coupon: null,
      error: `Minimum purchase amount of $${coupon.minPurchaseAmount} required`,
      discount: 0
    };
  }

  // Calculate discount
  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = (subtotal * coupon.value) / 100;
  } else if (coupon.type === 'fixed') {
    discount = coupon.value;
  }

  // Ensure discount doesn't exceed subtotal
  discount = Math.min(discount, subtotal);

  return {
    valid: true,
    coupon,
    error: null,
    discount
  };
}

/**
 * Get all active coupons
 */
export function getActiveCoupons(): Coupon[] {
  const coupons = getCouponsWithUpdatedUses();
  const today = new Date();
  return coupons.filter(coupon => {
    const expiryDate = new Date(coupon.expiryDate);
    return (
      coupon.active &&
      today <= expiryDate &&
      coupon.currentUses < coupon.maxUses
    );
  });
}

/**
 * Format discount display
 */
export function formatCouponDiscount(coupon: Coupon, discount: number): string {
  if (coupon.type === 'percentage') {
    return `-${coupon.value}%`;
  } else {
    return `-৳${discount.toFixed(0)}`;
  }
}

/**
 * Get coupon suggestions filtered by eligibility
 */
export function getCouponSuggestions(subtotal: number = 0): Coupon[] {
  return getActiveCoupons()
    .filter(coupon => subtotal >= coupon.minPurchaseAmount);
}
