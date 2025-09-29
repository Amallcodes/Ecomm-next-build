'use client'

import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
    // const sessionId = searchParams.get("session_id")
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const clearBasket = useBasketStore((state) => state.clearBasket);

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [orderNumber, clearBasket]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4 text-center">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-semibold text-gray-800">
                        Thank you for your order!
                    </h1>
                </div>
                {orderNumber && (
                    <p className="text-gray-600">
                        Your order number is <span className="font-medium">{orderNumber}</span>.
                    </p>
                )}

                <div className="space-y-4">
                    <p className="text-grey-600">
                        A confirmation order has been sent to your registered email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-green-400 hover:bg-green-700">
                            <Link href="/">
                                Yout order details
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                Continue shopping
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
