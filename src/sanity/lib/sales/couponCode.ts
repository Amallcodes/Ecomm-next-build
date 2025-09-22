export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMAS: "XMAS2025",
    EID: "EID2025",
    BTS: "BTS2025"
} as const;

export type CouponCode = keyof typeof COUPON_CODES;