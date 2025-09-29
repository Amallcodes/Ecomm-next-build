'use client'

import AddToCartButton from "@/components/add-to-cart";
import Loader from "@/components/ui/loader";
import ImageUrl from "@/lib/image-url";
import { useBasketStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createCheckoutSession, MetaData } from "../../../../actions/create-checkout-session";

const CartPage = () => {
    const groupedItems = useBasketStore(state => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // wait for client to mount
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <Loader />
    }

    if (groupedItems.length === 0) {
        return (
            <div className="">
                <h1>Your Cart</h1>
                <p>Your cart is empty!</p>
            </div>
        )
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return;

        setIsLoading(true);

        try {
            const metaData: MetaData = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user?.id
            }

            const checkoutUrl = await createCheckoutSession(groupedItems, metaData);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error creating checkout session", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="">
            <div className="">
                <h1 className="text-xl my-4 font-semibold">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow">
                        {groupedItems.map((item) => (
                            <div
                                key={item.product._id}
                                className="mb-4 p-4 border rounded flex items-center justify-between"
                            >
                                <div className="flex items-center cursor-pointer flex-3 min-w-0"
                                    onClick={() => {
                                        router.push(`/product/${item.product.slug?.current}`)
                                    }}
                                >
                                    <div
                                        className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4"
                                    >
                                        {item.product.image && (
                                            <Image
                                                src={ImageUrl(item.product.image).url()}
                                                alt={item.product.name ?? "product image"}
                                                className="w-full h-full object-cover rounded"
                                                width={96}
                                                height={96}
                                                quality={100}
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-lg sm:text-xl font-semibold truncate"
                                        >
                                            {item.product.name}
                                        </h2>
                                        <p
                                            className="text-sm sm:text-base"
                                        >
                                            Price: ₦
                                            {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="">
                                    <AddToCartButton product={item.product} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded
                    order-first lg:order-last fixed bottom-0 left-0 lg:left-auto"
                    >
                        <h3
                            className="text-xl font-semibold"
                        >Order summary</h3>

                        <div className="mt-4 space-y-2">
                            <p className="flex justify-between">
                                <span>Items:</span>
                                <span>
                                    {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            </p>

                            <p className="flex justify-between text-2xl font-bold border-t pt-2">
                                <span>Total:</span>
                                <span>
                                    {useBasketStore.getState().getTotalPrice().toFixed(2)}
                                </span>
                            </p>
                        </div>

                        {isSignedIn ? (
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="mt-4 w-full bg-blue text-white px-4 py-2 rounded hover:bg-blue disabled:bg-gray-400"
                            >
                                {isLoading ? "Processing" : "Checkout"}
                            </button>
                        ) : (
                            <SignInButton mode="modal">
                                <button
                                    className="mt-4 w-full bg-blue text-white px-4 py-2 rounded border:bg-blue"
                                >
                                    Sign in to Checkout
                                </button>
                            </SignInButton>
                        )}
                    </div>

                    <div className="h-64 lg:h-0">
                        {/* spacer */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CartPage;