import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'order',
    type: 'document',
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "order numer",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "stripeCheckoutId",
            title: "stripe checkout session id",
            type: "string",
            // validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "stripeCustomerId",
            title: "stripe customer id",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "clerkUserId",
            title: "store user id",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "customerName",
            title: "customer name",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "email",
            title: "customer email",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "stripe payment intent id",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "products",
            title: "products",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "product bought",
                            type: "reference",
                            to: [{ type: "product" }]
                        }),
                        defineField({
                            name: "quantity",
                            title: "quantity purchased",
                            type: "number"
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency"
                        },
                        prepare(select) {
                            return ({
                                title: `${select.product} X ${select.quantity}`,
                                subtitle: `${select.price * select.quantity}`,
                                media: select.image
                            })
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalprice",
            title: "total price",
            type: "number",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "currency",
            title: "currency",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "amountDiscounted",
            title: "amount dicounted",
            type: "number",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "status",
            title: "order status",
            type: "string",
            options: {
                list: [
                    {title: "pending", value: "pending"},
                    {title: "paid", value: "paid"},
                    {title: "shipped", value: "shipped"},
                    {title: "delivered", value: "delivered"},
                    {title: "cancelled", value: "cancelled"},
                ]
            }
        }),
        defineField({
            name: "orderDate",
            title: "order date",
            type: "datetime",
            validation: (Rule) => Rule.required()
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalprice",
            currency: "currency",
            orderId: "orderNumber",
            email: "email"
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
            return {
                title: `${select.name} (${orderIdSnippet})`,
                subtitle: `${select.amount} ${select.currency} ${select.email}`,
                media: BasketIcon,
            }
        }
    }
})