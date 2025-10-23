import OrderCard from "@/components/order-card";
import { getByOrders } from "@/sanity/lib/orders/get-by-orders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Orders = async () => {
    const { userId } = await auth();

    if (!userId) redirect("/");

    const orders = await getByOrders(userId);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-500 tracking-tight mb-8">
                    Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>You have not placed any orders yet</p>
                    </div>
                ) : (
                    <div className="">
                        {orders.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;