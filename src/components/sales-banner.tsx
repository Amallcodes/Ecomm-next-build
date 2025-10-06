import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/get-active-sale-by-coupon-code";

const SalesBanner = async () => {
    // const sale = await getActiveSaleByCouponCode('BFRIDAY') or 
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY)

    if (!sale?.isActive) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-[#008080b2] to-gray-200 py-8 px-6 rounded-lg text-white mt-4">
            <div className="">
                <h2 className="font-semibold text-[1.1rem]lg: text-[1.3rem]">Black Friday Sales!!!</h2>
                <p className="text-[.9rem] lg:text-[1rem]">get 10% off any product</p>

                <div className="bg-white p-4 text-gray-700 rounded-sm mt-4
                lg:w-[30%]">
                    use code: <span className="text-red-400">BFRIDAY</span> to get a discount off any purchase!
                </div>
            </div>
        </div>
    );
}

export default SalesBanner;