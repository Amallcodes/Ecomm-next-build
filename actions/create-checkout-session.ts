'use server'

import ImageUrl from "@/lib/image-url"
import stripe from "@/lib/stripe"
import { BasketItem } from "@/store/store"

export type MetaData = {
    orderNumber: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string
}

export type GroupedBasketItem = {
    product: BasketItem["product"], // This extracts just the Product type
    quantity: number
}

export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: MetaData
) {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

    try {
        // check if any grouped item does not have a price
        const itemWithoutPrice = items.filter((item) => item.product.price === null || item.product.price === undefined);

        if (itemWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price")
        }

        // search for exisiting customer by email
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        })

        let customerId: string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${baseUrl}/basket`,
            line_items: items.map((item) => ({ // we are returning an array of cart items
                price_data: {
                    currency: "ngn",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "unnamed product",
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id
                        },
                        images: item.product.image ? [ImageUrl(item.product.image).url()] : []
                    }
                },
                quantity: item.quantity
            }))
        })

        return session.url;
    } catch (error) {
        console.error("Error creating checkout session", error)
        throw error
    }
}