import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { MetaData } from "../../../../actions/create-checkout-session";
import { backendClient } from "@/sanity/lib/backend-client";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return NextResponse.json(
            { error: 'Stripe webhook secret is not set' },
            { status: 400 }
        )
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error("webhook signature failed", error);

        return NextResponse.json(
            { error: `Webhook error ${error}` },
            { status: 400 }
        )
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in sanity: ", order)
        } catch (error) {
            console.error("Error creating order in sanity", error);

            return NextResponse.json(
                { error: `Error creating server` },
                { status: 500 }
            )
        }
    }

    return NextResponse.json({ received: true })
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } = session;

    const {orderNumber, customerName, customerEmail, clerkUserId} = metadata as MetaData;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ['data.price.product']
        }
    )

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product).metadata?.id
        },
        quantity: item.quantity || 0
    }))

    return await backendClient.create({
        _type: "order",
        orderNumber,
        // align to schema field names
        stripeCheckoutId: id,
        stripePaymentIntentId: payment_intent as string,
        customerName,
        stripeCustomerId: customer as string,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscounted: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalprice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString()
    })
}