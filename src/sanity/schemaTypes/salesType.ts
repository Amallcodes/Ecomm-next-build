import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sales',
    title: 'sales',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "sale title",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "sale description",
            type: "text"
        }),
        defineField({
            name: "discountedAmount",
            title: "discounted amount",
            type: "number",
            description: "amount off in percentage or fixed value"
        }),
        defineField({
            name: "couponCode",
            title: "coupon code",
            type: "string"
        }),
        defineField({
            name: "validFrom",
            title: "valid from",
            type: "datetime"
        }),
        defineField({
            name: "validUntil",
            title: "valid until",
            type: "datetime"
        }),
        defineField({
            name: "isActive",
            title: "is active",
            type: "boolean",
            description: "toggle to activate or deactivate the sale",
            initialValue: true
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "discountedAmount",
            couponCode: "couponCode",
            isActive: "isActive"
        },
        prepare(selection) {
            const {title, discountAmount, couponCode, isActive} = selection;
            const status = isActive? "active" : "Inactive";
            return {
                title,
                subtitle: `${discountAmount}% off - code -${couponCode} - ${status}`
            }
        }
    }
})