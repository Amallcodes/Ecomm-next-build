import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export async function getByOrders(userId) {
    if (!userId) {
        throw new Error("user id is required")
    }


    // this block is how we expand and spead in a groq query
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
            ..., // spread operator i'e include all fields from the document
            products[]{
                ...,
                product->{
                ...  // This means "include ALL fields from the product document"
                }
            }
        }
        `);

        try {
            const orders = await sanityFetch({
                query: MY_ORDERS_QUERY,
                params: {userId}
            })

            return orders.data || []
        } catch (error) {
            console.error("Error fetching orders:", error)
            throw new Error("Error fetching orders")
        }
}